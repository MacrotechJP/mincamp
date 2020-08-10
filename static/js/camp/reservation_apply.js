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


    $("#next_apply").hide();
    $("#next_complite").hide();
    /**
     * 「次へ進む」ボタン
     * 予約申込→予約内容確認
     */
    $("#next_conform").on("click",function(){
        // チェックバリデーション
        $(".needs-validation").addClass("was-validated");
        // 入力項目の無効化
        $("input.camp").prop("disabled",true);
        // ステップバーの移動
        $(".contents_progress ol li:nth-of-type(2)").attr("class","current");
        // 先頭へスクロール
        $('html,body').animate({scrollTop:0}, 'fast');
        // ボタンの表示、非表示
        $("#next_apply").show();
        $("#next_conform").hide();
        $("#next_complite").show();
    })


    /**
     * 「戻る」ボタン
     * 予約内容確認→予約申込
     */
    $("#next_apply").on("click",function(){
        // 入力項目の無効化
        $("input.camp").prop("disabled",false);
        // ステップバーの移動
        $(".contents_progress ol li:nth-of-type(2)").attr("class","");
        // 先頭へスクロール
        $('html,body').animate({scrollTop:0}, 'fast');
        // ボタンの表示、非表示
        $("#next_apply").hide();
        $("#next_conform").show();
        $("#next_complite").hide();
    })
})