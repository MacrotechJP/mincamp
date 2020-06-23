$(function(){

    /** Google-Recaptcha認証 */
    google_recaptcha = false
    verifyCallback = function(response) { //Google-Recaptcha認証成功時
        google_recaptcha = true
        $(".g-recaptcha.error").hide();
    };
    expiredCallback = function() { //Google-Recaptcha認証一定時間経過
        google_recaptcha = false
    };

    /** mincampログイン実行時 */
    $("button.mincamp").on("click", function(){
        if(google_recaptcha==false){
            $(".g-recaptcha.error").show();
            return false;
        }else{
            $(".toast-header .spinner-grow").show();
        }
    })
})