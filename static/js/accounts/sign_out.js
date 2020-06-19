$(function(){

    /** １０秒後トップページへリダイレクト */
    window.onload = function () {
        cnt = 5;                           // 10秒前からカウントスタート
        $('.redirect-count').text(cnt);
        cnDown = setInterval(function(){    // 1秒おきにカウントマイナス
            cnt--;
            if(cnt <= 0){                   // 0秒になった為、リダイレクト
                clearInterval(cnDown);
                window.location.href = "/";
            }
            $('.redirect-count').text(cnt);
        },1000);
        $(window).scroll(function () {      // スクロール時カウントダウン停止
            if ($(this).scrollTop() > 0) {
                clearInterval(cnDown);
            }
        });
    };
})