
/*-----------------------------------------
.toggle_btn
------------------------------------------*/
$(function(){
    $('.toggle-btn').on('click', function(){
        
        if($('.nav-buttons').hasClass('open')){
            $('.nav-buttons').removeClass('open');
            $('.nav-menu').removeClass('open');
            $('.nav-menu-inner').css('display', 'none');
        }else{
            $('.nav-buttons').addClass('open');
            $('.nav-menu').addClass('open');
            $('.nav-menu-inner').delay(500).fadeIn(700);
        }
    });
    

/*-----------------------------------------
    swiper
------------------------------------------*/
let isFirstLoad = true;
  // Swiper 初期化処理
  let swiper;

  function initSwiper() {

const swiper = new Swiper(".swiper", {
    loop: true,
    allowTouchMove: false,
    autoplay: {
        delay: 5000,
    },
    speed: 600,
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + totalClass + '"></span>' + '<span class="border js-border"><span></span></span>' + '<span class="' + currentClass + '"></span>';
        }
    },
    parallax: true,
    on: {
        init: function () {
          // 初期状態の位置を明示（必要に応じて）
            this.setTranslate(-this.activeIndex * this.width);
                  // 初期スライドにズームアニメクラス付与
            const firstSlide = this.slides[this.activeIndex];
            firstSlide.classList.add('add-animation');
        },
        slideChange: function () {
            const pagination = document.querySelector('.swiper-pagination');
            pagination.classList.remove('is-active');
            void pagination.offsetWidth; // 再描画を強制
            pagination.classList.add('is-active');
        },
        slideChangeTransitionStart: function () {
            const prevIndex = this.previousIndex;
            const nextIndex = this.activeIndex;
            const currentOffset = -prevIndex * this.width;
            const fullOffset = -nextIndex * this.width;
            const midOffset = currentOffset + (fullOffset - currentOffset) * 0.2;
            
            // ズームアニメ適用 (全スライドクラス削除→次へ付与)
            const nextSlide = this.slides[this.activeIndex];
            nextSlide.classList.add('add-animation');
            
            // 最初の10%をゆっくり動かす
                this.setTransition(700); // 0.4秒
                this.setTranslate(midOffset);
            
            setTimeout(() => {
                // 残り90%をゆっくりに動かす
                this.setTransition(400); // 0.5秒
                this.setTranslate(fullOffset);
            }, 400);
            
        },
    },
});
}
function updateSwiperDirection() {
    const w = window.innerWidth;
    const isRTL = (w >= 561 && w <= 959) ? true : false;
    const currentDir = swiper.rtlTranslate;
  
    if (isRTL !== currentDir) {
      swiper.changeLanguageDirection(isRTL ? 'rtl' : 'ltr'); // dir属性も切り替え
      swiper.changeDirection('horizontal', false); // 方向は変わらないけど内部更新
    }
  }
  
  // 初期化と監視
  $(function () {
    initSwiper();
    updateSwiperDirection();
  
    $(window).on('resize', function () {
      clearTimeout(window._swiperResizeTimer);
      window._swiperResizeTimer = setTimeout(updateSwiperDirection, 300);
    });
});


    /*-----------------------------------------
    slick
    ------------------------------------------*/
    $('.slick').slick({
        autoplay: false,
        centerMode: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 400,
        dots: false, //ドットの有無
        fade: false, //フェードの有無
        arrows: true, //矢印の有無
        infinite: true, //無限スライド
        accessibility: true, //ボタンで切り替えできるかどうか
        pauseOnFocus: false, //スライドにマウスホバーした時に、自動再生を止めるか
        pauseOnHover: false, //自動再生時、ドットにマウスオンで一時停止するかどうか
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    variableWidth: true,
                    centerPadding: "20px",
                }
            },
            {
                breakpoint: 559,
                settings: {
                    variableWidth: true,
                    centerMode: true,
                    centerPadding: "20px",
                    slidesToShow: 1,
                }
            }
        ]
    });
    /*-----------------------------------------
    footer hover
    ------------------------------------------*/
    $('.entry').hover(function() {
        $('.hover').toggleClass('active')
    });
    $('.base-search-title').hover(function() {
        $('.hover1').toggleClass('active')
    });
    $('.base01').hover(function() {
        $('.hover2').toggleClass('active')
    });
    $('.base02').hover(function() {
        $('.hover3').toggleClass('active')
    });
    $('.base03').hover(function() {
        $('.hover4').toggleClass('active')
    });
    $('.base04').hover(function() {
        $('.hover5').toggleClass('active')
    });
    $('.base05').hover(function() {
        $('.hover6').toggleClass('active')
    });
    $('.base06').hover(function() {
        $('.hover7').toggleClass('active')
    });
    $('.base07').hover(function() {
        $('.hover8').toggleClass('active')
    });
    $('.base08').hover(function() {
        $('.hover9').toggleClass('active')
    });
/* ========================================================
    #footer .base-area
=========================================================== */
    if(window.matchMedia('(max-width: 559px)').matches) {
    //559px以下の処理
        $('.norths').on('click', function(){

            if($('.north').hasClass('active')){
                $('.north').removeClass('active');
                $('.hokkaido').removeClass('active');
                $('.east').removeClass('active');
                $('.tokyo').removeClass('active');
                $('.west').removeClass('active');
                $('.kansai').removeClass('active');
                $('.western').removeClass('active');
                $('.hiroshima').removeClass('active');
                $('.south').removeClass('active');
                $('.fukuoka').removeClass('active');
                $('.base-area-name').removeClass('active');
            }else {
                $('.north').addClass('active');
                $('.hokkaido').addClass('active');
                $('.east').removeClass('active');
                $('.tokyo').removeClass('active');
                $('.west').removeClass('active');
                $('.kansai').removeClass('active');
                $('.western').removeClass('active');
                $('.hiroshima').removeClass('active');
                $('.south').removeClass('active');
                $('.fukuoka').removeClass('active');
                $('.base-area-name').addClass('active');
            }
        });
        $('.easts').on('click', function(){

            if($('.east').hasClass('active')){
                $('.north').removeClass('active');
                $('.hokkaido').removeClass('active');
                $('.east').removeClass('active');
                $('.tokyo').removeClass('active');
                $('.west').removeClass('active');
                $('.kansai').removeClass('active');
                $('.western').removeClass('active');
                $('.hiroshima').removeClass('active');
                $('.south').removeClass('active');
                $('.fukuoka').removeClass('active');
                $('.base-area-name').removeClass('active');
            }else {
                $('.north').removeClass('active');
                $('.hokkaido').removeClass('active');
                $('.east').addClass('active');
                $('.tokyo').addClass('active');
                $('.west').removeClass('active');
                $('.kansai').removeClass('active');
                $('.western').removeClass('active');
                $('.hiroshima').removeClass('active');
                $('.south').removeClass('active');
                $('.fukuoka').removeClass('active');
                $('.base-area-name').addClass('active');
            }
        });
        $('.wests').on('click', function(){

            if($('.west').hasClass('active')){
                $('.north').removeClass('active');
                $('.hokkaido').removeClass('active');
                $('.east').removeClass('active');
                $('.tokyo').removeClass('active');
                $('.west').removeClass('active');
                $('.kansai').removeClass('active');
                $('.western').removeClass('active');
                $('.hiroshima').removeClass('active');
                $('.south').removeClass('active');
                $('.fukuoka').removeClass('active');
                $('.base-area-name').removeClass('active');
            }else {
                $('.north').removeClass('active');
                $('.hokkaido').removeClass('active');
                $('.east').removeClass('active');
                $('.tokyo').removeClass('active');
                $('.west').addClass('active');
                $('.kansai').addClass('active');
                $('.western').removeClass('active');
                $('.hiroshima').removeClass('active');
                $('.south').removeClass('active');
                $('.fukuoka').removeClass('active');
                $('.base-area-name').addClass('active');
            }
        });
        $('.westerns').on('click', function(){

            if($('.western').hasClass('active')){
                $('.north').removeClass('active');
                $('.hokkaido').removeClass('active');
                $('.east').removeClass('active');
                $('.tokyo').removeClass('active');
                $('.west').removeClass('active');
                $('.kansai').removeClass('active');
                $('.western').removeClass('active');
                $('.hiroshima').removeClass('active');
                $('.south').removeClass('active');
                $('.fukuoka').removeClass('active');
                $('.base-area-name').removeClass('active');
            }else {
                $('.north').removeClass('active');
                $('.hokkaido').removeClass('active');
                $('.east').removeClass('active');
                $('.tokyo').removeClass('active');
                $('.west').removeClass('active');
                $('.kansai').removeClass('active');
                $('.western').addClass('active');
                $('.hiroshima').addClass('active');
                $('.south').removeClass('active');
                $('.fukuoka').removeClass('active');
                $('.base-area-name').addClass('active');
            }
        });
        $('.souths').on('click', function(){

            if($('.south').hasClass('active')){
                $('.north').removeClass('active');
                $('.hokkaido').removeClass('active');
                $('.east').removeClass('active');
                $('.tokyo').removeClass('active');
                $('.west').removeClass('active');
                $('.kansai').removeClass('active');
                $('.western').removeClass('active');
                $('.hiroshima').removeClass('active');
                $('.south').removeClass('active');
                $('.fukuoka').removeClass('active');
                $('.base-area-name').removeClass('active');
            }else {
                $('.north').removeClass('active');
                $('.hokkaido').removeClass('active');
                $('.east').removeClass('active');
                $('.tokyo').removeClass('active');
                $('.west').removeClass('active');
                $('.kansai').removeClass('active');
                $('.western').removeClass('active');
                $('.hiroshima').removeClass('active');
                $('.south').addClass('active');
                $('.fukuoka').addClass('active');
                $('.base-area-name').addClass('active');
            }
        });
    }
/* ========================================================
    #top-button click function
=========================================================== */
    $('.fa-times').on('click', function() {
        if($('.pickup').hasClass('active')){
            $('.pickup, #top-button').removeClass('active');
        }else{
            $('.pickup, #top-button').addClass('active');
        }
        
    })
    var topBtn = $('#top-button');
    topBtn.hide();
    var lastScrollTop = 0;// 最後のスクロール位置
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();

        if($(this).scrollTop() > 130){
            topBtn.fadeIn();
            $('#header').addClass('fixed');
            if(scrollTop > lastScrollTop){
                // 最後のスクロール位置
                $('#header, .info, .nav-items a, .header-img, .header-img img').addClass('active');
                $('.header-img img').removeClass('scale');
            }else{
            // 上スクロール：デザイン元に戻す
            $('#header, .info, .nav-items a, .header-img, .header-img img').removeClass('active');
            $('.header-img img').addClass('scale');
            }
        } else {
        // 最後のスクロール位置を更新
            topBtn.fadeOut();
            $('#header').removeClass('fixed');
            $('.info, .nav-items a, .header-img, .header-img img').removeClass('active');
            $('.header-img img').removeClass('scale');
        }
        lastScrollTop = scrollTop;// 最後のスクロール位置を更新
    });
    topBtn.click(function() {
        $('html, body').animate({ scrollTop:0 }, 300);
    });
/* ========================================================
    top fadeIn function
=========================================================== */
    $(document).ready(function(){
        $('.swiper').animate({
            opacity: 1,
            right: '0'
        });
        $('.first-text span, .second-text span, .english span, .text-top p span, .top-btn a').addClass('active');
    });
/* ========================================================
    fadeIn function
=========================================================== */
    $(window).scroll(function() {
        $('.fadeIn').each(function() {
            var pos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var winH = $(window).height();
            if (scroll >= pos - winH + winH/100){
                $(this).addClass('active');
            }
        });
    });
});
