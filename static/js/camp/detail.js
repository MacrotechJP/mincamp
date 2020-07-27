$(function(){
    /**
     * 画像スライドショー
     * ポップアップ画面
     */
    $(".host-images").iziModal({
        group: "group01",
        loop: true,
        fullscreen: true,
        headerColor: "#91b500",
    });

    /** 
     * 合計金額計算部分の補足情報表示
     */
    $('[data-toggle="tooltip"]').tooltip();

    /**
     * 用具レンタル
     * 画像スライドショー
     */


    /** 
     * プロフィールアニメーション
     */
    // This just toggles the follow/following of the button
$('a.follow').click(function () {
    $(this).toggleClass('followed');
    
    if($(this).hasClass('followed')) {
      $(this).text('Followed');
      $('ul li:last-child').html('325<span>Followers</span>');
    }
    else {
      $(this).text('Follow Nick');
      $('ul li:last-child').html('324<span>Followers</span>');
    }
  });
      
    
})