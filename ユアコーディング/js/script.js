$(function() {

  /* swiper */
  const swiper = new Swiper('.swiper-container', {

    loop: true,
    spaceBetween: 56,
    loopedSlides: 5,
    slidesPerView:3.5,
    /* widthを指定するとcenteredSlidesが機能しない */
    centeredSlides: true,
    // width: 322,

    autoplay: {
      delay: 5000
    },

    breakpoints: {
      1110: {
        slidesPerView: 3.5
      },

      800: {
        slidesPerView: 2.5
      },

      616: {
        slidesPerView: 2
      },

      520: {
        slidesPerView: 1.5,
        spaceBetween: 20
      },

      319: {
        slidesPerView: 1.14,
        spaceBetween: 25
      },
    },
  });


  /* ドロワーメニュー */
  $(".drawer_box").click(function(e) {
    e.preventDefault();
  
    $(this).toggleClass("is_active");
    $(".drawer_content").toggleClass("is_active");
    $(".drawer_bar").toggleClass("is_active");
    $(".drawer_bg").toggleClass("is_active");
  });

  $(".drawer_content_item_link").click(function() {
    $(".drawer_box").toggleClass("is_active");
    $(".drawer_bar").toggleClass("is_active");
    $(".drawer_content").toggleClass("is_active");
    $(".drawer_bg").toggleClass("is_active");
  });
  

  /* スムーススクロール */
  $("a[href^='#']").click(function() {
  
    var speed = 300;
    var header = $(".header").innerHeight();
    var id = $(this).attr("href");
    var position = 0;
  
    if (id != "#") {
      var position = $(id).offset().top - header;
    }
  
    $("html, body").animate({
      scrollTop: position
    },
    speed
    );
    return false;
  });


  /* wow */
  new WOW().init();


  /* アコーディオンメニュー */
  $(".faq_question").click(function() {
    /* next() :  作用した要素と同じ階層の次の要素 */
    $(this).next().slideToggle();
    $(this).children(".qa-box-q-icon").toggleClass("is-open");
  });



  /* 送信ボタンの有効化 */
  (function() {
    var requireFlg = false;
    var privacyFlg = false;
    var require = $( "#js_form .js_require" );
    var fillCount = 0;
  
    function setSubmitProp() {
      if( requireFlg && privacyFlg ) {
        $( "#form_submit" ).prop( "disabled", false );
      } else {
        $( "#form_submit" ).prop( "disabled", true );
      }
    }
  
    // 必須項目
    require.blur(function() {
      if( $( this ).attr( "id" ) === "js_form_ruby" && !$( this ).val().match( /^([ァ-ン]|ー)+$/ ) ) {
        $( this ).val( "" );
        alert( "全角カタカナで入力してください。" )
      }
  
      require.each( function() {
        var value = $( this ).val();
  
        if( ( value !== "" && value.match( /[^\s\t]/ ) ) ) {
          fillCount++;
        }
      });
  
      requireFlg = ( fillCount === require.length ? true : false );
  
      setSubmitProp();
      fillCount = 0;
    });
  
    // プライバシーポリシー
    $( "#privacy" ).change(function() {
      privacyFlg =  ( $( this ).prop( "checked" ) ? true : false );
      setSubmitProp();
    });
  
    // 送信時
    $( "#js_form" ).submit(function() {
      if( !( requireFlg && privacyFlg ) ) {
        alert( "入力に誤りがあります。" );
        return false;
      }
    });
  })();

  /* Google フォーム */
  var $form = $( "#js_form" );
  
  $form.submit(function(e) {
    $.ajax({ 
    url: $form.attr( "action" ), 
    data: $form.serialize(), 
    type: "POST", 
    dataType: "xml", 
    statusCode: { 
        0: function() { 
        }, 
        200: function() { 
        }
      }
    });
    return false; 
  });
});