$(function(){
    $("header .header-menu.search").hide();

    /** スクロール時、ヘッダーCSS変更 */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $("header").css("background-color","rgba(0,0,0,0.6)");
            $("header .header-icon").css("background-color","white");
            $("header .header-menu").css({'cssText': 'color: white !important;'});
            $("header .header-menu.search").fadeIn(1000);
        } else {
            $("header").css("background-color","transparent");
            $("header .header-icon").css("background-color","transparent");
            $("header .header-menu").css({'cssText': 'color: #222222 !important;'});
            $("header .header-menu.search").fadeOut(500);
        }
        console.log($(this).scrollTop());
    });

    $("input").flatpickr({mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    conjunction: " :: "
    });

    /** キャンプカテゴリー自動スライダー */
    let mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0.5;

    let mainSliderOptions = {
        loop: true,
        speed:1000,
        autoplay:{
            delay:3000
        },
        loopAdditionalSlides: 10,
        grabCursor: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function(){
                this.autoplay.stop();
            },
            imagesReady: function(){
                this.el.classList.remove('loading');
                this.autoplay.start();
            },
            slideChangeTransitionEnd: function(){
                let swiper = this,
                captions = swiper.el.querySelectorAll('.caption');
                btn_gradation = swiper.el.querySelectorAll('.btn-gradation');
                for (let i = 0; i < captions.length; ++i) {
                    captions[i].classList.remove('show');
                }
                for (let i = 0; i < btn_gradation.length; ++i) {
                    btn_gradation[i].classList.remove('show');
                }
                swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
                swiper.slides[swiper.activeIndex].querySelector('.btn-gradation').classList.add('show');
            },
            progress: function(){
                let swiper = this;
                for (let i = 0; i < swiper.slides.length; i++) {
                    let slideProgress = swiper.slides[i].progress,
                    innerOffset = swiper.width * interleaveOffset,
                    innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-bgimg").style.transform = "translateX(" + innerTranslate + "px)";
                }
            },
            touchStart: function() {
                let swiper = this;
                for (let i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function(speed) {
                let swiper = this;
                for (let i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-bgimg").style.transition = speed + "ms";
                }
            }
        }
    };
    let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);
    let navSliderOptions = {
        loop: true,
        loopAdditionalSlides: 10,
        speed:1000,
        spaceBetween: 5,
        slidesPerView: 5,
        centeredSlides : true,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        direction: 'vertical',
        on: {
            imagesReady: function(){
                this.el.classList.remove('loading');
            },
            click: function(){
                mainSlider.autoplay.stop();
            }
        }
    };
    let navSlider = new Swiper(navSliderSelector, navSliderOptions);
    mainSlider.controller.control = navSlider;
    navSlider.controller.control = mainSlider;


    //地域を選択
    $('.area_btn').click(function(){
        $('.area_overlay').show();
        $('.pref_area').show();
        var area = $(this).data('area');
        $('[data-list]').hide();
        $('[data-list="' + area + '"]').show();
    });
    
    //レイヤーをタップ
    $('.area_overlay').click(function(){
        prefReset();
    });
    
    //都道府県をクリック
    $('.pref_list [data-id]').click(function(){
        if($(this).data('id')){
            var id = $(this).data('id');
            //このidを使用して行いたい操作をしてください
            //都道府県IDに応じて別ページに飛ばしたい場合はこんな風に書く↓
            //window.location.href = 'https://kinocolog.com/pref/' + id;
            
            prefReset();
        }
    });
    
    //表示リセット
    function prefReset(){
        $('[data-list]').hide();
        $('.pref_area').hide();
        $('.area_overlay').hide();
    }
})