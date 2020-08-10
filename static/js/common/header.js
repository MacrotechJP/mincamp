$(function(){
    /** スクロール時、ヘッダーCSS変更 */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $("header").css("background-color","rgba(0,0,0,0.6)");
            $("header .header-icon").css("background-color","white");
            $("header .header-menu").css({'cssText': 'color: white !important;'});
            $("header .header-menu.search").fadeIn(1000);
        } else {
            $("header").css("background-color","white");
            $("header .header-icon").css("background-color","transparent");
            $("header .header-menu").css({'cssText': 'color: #222222 !important;'});
            $("header .header-menu.search").fadeOut(500);
        }
    });
})