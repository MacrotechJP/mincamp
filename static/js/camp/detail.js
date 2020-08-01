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
   * 「続きを表示」ボタンで、ショップを表示。
   * 「閉じる」ボタンで、ショップを非表示。
   */
  $(".contents_main-info_left_rental_box_continue p").on("click", function(){
    $(".contents_main-info_left_rental_box_list").css("overflow","auto");
    list_height = $(".contents_main-info_left_rental_box_list").height()+50;
    $(".contents_main-info_left_rental_box_list").css("overflow","visible");
    $(".contents_main-info_left_rental_box").css("height",list_height);
    $(".contents_main-info_left_rental_box_continue").hide();
    $(".contents_main-info_left_rental_box_close").css("display","flex");
  });
  $(".contents_main-info_left_rental_box_close p").on("click", function(){
    $(".contents_main-info_left_rental_box").css("height","200px");
    $(".contents_main-info_left_rental_box_continue").show();
    $(".contents_main-info_left_rental_box_close").css("display","none");
  });

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