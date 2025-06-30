
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

