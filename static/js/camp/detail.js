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
    
  
    /**
     * 周辺のアクティビティー
     */
    $('.owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })
    $(function () {
        $(".material-card > .mc-btn-action").click(function () {
          var card = $(this).parent(".material-card");
          var icon = $(this).children("i");
          icon.addClass("fa-spin-fast");
      
          if (card.hasClass("mc-active")) {
            card.removeClass("mc-active");
      
            window.setTimeout(function () {
              icon
                .removeClass("fa-arrow-left")
                .removeClass("fa-spin-fast")
                .addClass("fa-bars");
            }, 800);
          } else {
            card.addClass("mc-active");
      
            window.setTimeout(function () {
              icon
                .removeClass("fa-bars")
                .removeClass("fa-spin-fast")
                .addClass("fa-arrow-left");
            }, 800);
          }
        });
      });
      
    
    
})