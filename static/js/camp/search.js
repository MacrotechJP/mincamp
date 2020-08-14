$(function(){

    /**
     * 検索欄「場所」
     */
    $(document).on("click", ".contents_search_place_candidate ul li", function(){
        $("input#place").val($(this).attr("value"));
        $(".contents_search_place_candidate ul").empty();
    })
    $("input#place").keyup(function() {
        input_word = $(this).val();
        $(".contents_search_place_candidate ul").empty();
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            data: {
                address: input_word,
                key: 'AIzaSyC_Pzh7Jp3VFP77rv62gO5rSWz8NYMStGY'
            },
            dataType:"json",
            success: function(data) {
                if (data.status == "OK") {
                    $(".contents_search_place_candidate ul").empty();
                    console.log(data.results);
                    $.each(data.results, function(index, place) {
                        search_address = ""
                        $(place.address_components.reverse()).each(function(index, value){
                            if (value.types[0] == "country" || value.types[0] == "administrative_area_level_1") {
                                search_address += value.long_name+"、"
                            } else if (value.types[0] == "postal_code") {
                            } else {
                                search_address += value.long_name
                            }
                        });
                        if (search_address.slice(-1)=="、") search_address = search_address.slice( 0, -1 );
                        $(".contents_search_place_candidate ul").append("<li value='"+search_address+"'><i class='fas fa-map-marker-alt'></i>&nbsp;"+search_address+"</li>");
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
    date = $("input#date").attr("value");
    $("input#date").val(date);
    $("input#date").change(function() {
        $("input#date_start").val($(this)[0]["_flatpickr"]["selectedDates"][0]);
        $("input#date_end").val($(this)[0]["_flatpickr"]["selectedDates"][1]);
        $(this).val($(this).val().replace(/to/,"〜"))
    });

    //////
    // const config = {
    //     onChange: function() {
    //         console.log(this.selectedDates);
    //     }
    // }
    // let fp = flatpickr('input#date', config);


    /**
     * 検索欄「人数」
     */
    $("input#member_adult").on("input", function(){
        $(".contents_search_member_candidate_adult span").text($(this).val()+"人");
    });
    $("input#member_child").on("input", function(){
        $(".contents_search_member_candidate_child span").text($(this).val()+"人");
    });
    $(".contents_search_member_candidate_update button").on("click", function(){
        adult = $("input#member_adult").val();
        child = $("input#member_child").val();
        $("input#member").val("大人"+adult+"名、子ども"+child+"名");
        $(".contents_search_member_candidate").fadeOut(500);
    });
    $("input#member").focus(function(){
        $(".contents_search_member_candidate").fadeIn(500);
    })


    /**
     * 並び替えドロップボックス
     */
$(document).ready(function(){
    
    var countOption = $('.old-select option').length;
    
    function openSelect(){
        var heightSelect = $('.new-select').height();
        var j=1;
        $('.new-select .new-option').each(function(){
            $(this).addClass('reveal');
            $(this).css({
                'box-shadow':'0 1px 1px rgba(0,0,0,0.1)',
                'left':'0',
                'right':'0',
                'top': j*(heightSelect+1)+'px'
            });
            j++;
        });
    }
    
    function closeSelect(){
        var i=0;
        $('.new-select .new-option').each(function(){
            $(this).removeClass('reveal');
            if(i<countOption-3){
                $(this).css('top',0);
                $(this).css('box-shadow','none');
            }
            else if(i===countOption-3){
                $(this).css('top','3px');
            }
            else if(i===countOption-2){
                $(this).css({
                    'top':'7px',
                    'left':'2px',
                    'right':'2px'
                });
            }
            else if(i===countOption-1){
                $(this).css({
                    'top':'11px',
                    'left':'4px',
                    'right':'4px'
                });
            }
            i++;
        });
    }
    
    // Initialisation
    if($(".old-select option[selected]").length === 1){
        $('.selection p span').html($('.old-select option[selected]').html());
    }
    else{
        $('.selection p span').html($('.old-select option:first-child').html());
    }
    
    $('.old-select option').each(function(){
        newValue = $(this).val();
        newHTML = $(this).html();
        $('.new-select').append('<div class="new-option" data-value="'+newValue+'"><p>'+newHTML+'</p></div>');
    });
    
    var reverseIndex = countOption;
    $('.new-select .new-option').each(function(){
        $(this).css('z-index',reverseIndex);
        reverseIndex = reverseIndex-1;        
    });
    
    closeSelect();
    
    
    // Ouverture / Fermeture
    $('.selection').click(function(){
        $(this).toggleClass('open');
        if($(this).hasClass('open')===true){openSelect();}
        else{closeSelect();}
    });
    
    
    // Selection 
    $('.new-option').click(function(){
        var newValue = $(this).data('value');
        
        // Selection New Select
        $('.selection p span').html($(this).find('p').html());
        $('.selection').click();
        
        // Selection Old Select
        $('.old-select option[selected]').removeAttr('selected');
        $('.old-select option[value="'+newValue+'"]').attr('selected','');
        
        // Visuellement l'option dans le old-select ne change pas
        // mais la value selectionnée est bien pris en compte lors 
        // de l'envoi du formulaire. Test à l'appui.
        
    });
});

    /**
     * カテゴリータグ追加のドロップボックス
     */

$(document).ready(function() {

    var select = $('select[multiple]');
    var options = select.find('option');

    var div = $('<div />').addClass('selectMultiple');
    var active = $('<div />');
    var list = $('<ul />');
    var placeholder = select.data('placeholder');

    var span = $('<span />').text(placeholder).appendTo(active);

    options.each(function() {
        var text = $(this).text();
        if($(this).is(':selected')) {
            active.append($('<a />').html('<em>' + text + '</em><i></i>'));
            span.addClass('hide');
        } else {
            list.append($('<li />').html(text));
        }
    });

    active.append($('<div />').addClass('arrow'));
    div.append(active).append(list);

    select.wrap(div);

    $(document).on('click', '.selectMultiple ul li', function(e) {
        var select = $(this).parent().parent();
        var li = $(this);
        if(!select.hasClass('clicked')) {
            select.addClass('clicked');
            li.prev().addClass('beforeRemove');
            li.next().addClass('afterRemove');
            li.addClass('remove');
            var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
            a.slideDown(400, function() {
                setTimeout(function() {
                    a.addClass('shown');
                    select.children('div').children('span').addClass('hide');
                    select.find('option:contains(' + li.text() + ')').prop('selected', true);
                }, 500);
            });
            setTimeout(function() {
                if(li.prev().is(':last-child')) {
                    li.prev().removeClass('beforeRemove');
                }
                if(li.next().is(':first-child')) {
                    li.next().removeClass('afterRemove');
                }
                setTimeout(function() {
                    li.prev().removeClass('beforeRemove');
                    li.next().removeClass('afterRemove');
                }, 200);

                li.slideUp(400, function() {
                    li.remove();
                    select.removeClass('clicked');
                });
            }, 600);
        }
    });

    $(document).on('click', '.selectMultiple > div a', function(e) {
        var select = $(this).parent().parent();
        var self = $(this);
        self.removeClass().addClass('remove');
        select.addClass('open');
        setTimeout(function() {
            self.addClass('disappear');
            setTimeout(function() {
                self.animate({
                    width: 0,
                    height: 0,
                    padding: 0,
                    margin: 0
                }, 300, function() {
                    var li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                    li.slideDown(400, function() {
                        li.addClass('show');
                        setTimeout(function() {
                            select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                            if(!select.find('option:selected').length) {
                                select.children('div').children('span').removeClass('hide');
                            }
                            li.removeClass();
                        }, 400);
                    });
                    self.remove();
                })
            }, 300);
        }, 400);
    });

    $(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function(e) {
        $(this).parent().parent().toggleClass('open');
    });

});

    /**
     * ホスト詳細を開く
     */
    $(".contents_main_hosts .details .details_header .details_header_left, .contents_main_hosts .details .details_main").on("click",function(){
        host_id = $(this).data("id")
        window.open('http://localhost:8000/camp/detail/'+host_id);
    })



    /**
     * ホスト画像スライドショー
     * 「右へスライド」
     * 「左へスライド」
     */
    $(".images_control .next").on("click",function(){
        host_id = $(this).data("id");
        image_total = $("figure[data-id^="+host_id+"]").length-1;
        image_current = $("figure.slide-on[data-id^="+host_id+"]").length;

        $("figure[data-id^="+host_id+"]").eq(image_total-image_current).attr("class","slide-on");

        if (image_current+1 > 0) $(this).prev().attr("disabled",false);     // 左矢印を表示する
        if (image_total == image_current+1) $(this).attr("disabled",true);  // 右矢印を非表示にする
    })
    $(".images_control .prev").on("click",function(){
        host_id = $(this).data("id");
        image_total = $("figure[data-id^="+host_id+"]").length-1;
        image_current = $("figure.slide-on[data-id^="+host_id+"]").length;

        $("figure[data-id^="+host_id+"]").eq(image_total - image_current + 1).attr("class","");

        if (image_current == 1) $(this).attr("disabled",true);                      // 左矢印を非表示にする
        if (image_total == image_current) $(this).next().attr("disabled",false);    // 右矢印を表示する
    })


    /**
     * Googleストリートビュー定義
     * 「360度アイコン」押下時、Googleストリートビュー表示
     */
    $('.images_rotation_view').iziModal({
        iframe: true,
        width:  "50vw",
        height: "60vh"
    });
    $(".images_rotation").on("click", function(){
        $(".images_rotation_view[data-id="+$(this).data("id")+"]").iziModal('open');
    })


    /**
     * 「興味なし」ボタン
     * 該当ホスト非表示
     */
    $(".details_header_right button").on("click", function(){
        host_id = $(this).data("id");
        $(".contents_main_hosts ol li[data-id="+host_id+"]").fadeOut(500);
    })
    
})