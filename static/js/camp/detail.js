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


    $('[data-toggle="tooltip"]').tooltip();
})