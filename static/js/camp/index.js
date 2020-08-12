$(function(){
    $("header .header-menu.search").hide();

    /**
     * 検索欄「場所」
     */
    $(document).on("click", ".contents_top_left_search_upper_place_candidate ul li", function(){
        $("input#place").val($(this).attr("value"));
        $(".contents_top_left_search_upper_place_candidate ul").empty();
    })
    $("input#place").keyup(function() {
        input_word = $(this).val();
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            data: {
                address: input_word,
                key: 'AIzaSyC_Pzh7Jp3VFP77rv62gO5rSWz8NYMStGY'
            },
            dataType:"json",
            success: function(data) {
                if (data.status == "OK") {
                    $(".contents_top_left_search_upper_place_candidate ul").empty();
                    console.log(data.results);
                    $.each(data.results, function(index, place) {
                        $(".contents_top_left_search_upper_place_candidate ul").append("<li value='"+place.formatted_address+"'><i class='fas fa-map-marker-alt'></i>&nbsp;"+place.formatted_address+"</li>");
                    })
                }
            },
            error: function(data) {
                console.log("非同期通信エラー")
            }
        });
    });



    /**
     * 検索欄「日付」
     */
    $("input#date").flatpickr({mode: "range",
        minDate: "today",
        dateFormat: "m月d日",
        conjunction: " :: "
    });
    $("input#date").prop('readonly', false);
    $("input#date").change(function() {
        $(this).val($(this).val().replace(/to/,"〜"))
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

    function socialHover(e) {
        console.log(e.type);
        var social = document.getElementById('social-container');
        var spanArray = social.getElementsByTagName('span');
        var spanWidths = [];
      
        for (var i = 0; i < spanArray.length; i++) {
          spanWidths.push(spanArray[i].clientWidth);
        }
      
        var socialId = e.target.dataset.socialId;
        if (e.type == 'mouseenter') {
          e.target.style.width = (spanWidths[socialId] + 50) + 'px';
        } else {
          e.target.style.width = '38px';
        }
      }
      
      window.onload = function() {
      
        var socialButtons = document.getElementsByClassName('social-button');
        for (var i = 0; i < socialButtons.length; i++) {
          socialButtons[i].setAttribute('data-social-id', i);
          socialButtons[i].addEventListener('mouseenter', function() { socialHover(event); });
          socialButtons[i].addEventListener('mouseleave', function() { socialHover(event); });
        }
      }
      
})