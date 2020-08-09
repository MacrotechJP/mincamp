$(function(){





    /**
     * 料金の内訳
     */
    $('#price-breakdown').iziModal({
        title: '料金の内訳',
        fullscreen: true,
        headerColor: "#91b500",
    });
    $(".contents_apply_host_info_breakdown span").on("click",function(){
        $('#price-breakdown').iziModal('open');
    })

    


})