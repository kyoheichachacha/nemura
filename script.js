
/*-----------------------------------------
    swiper
------------------------------------------*/
// .swiperというクラス名の要素に対してSwiperを初期化し、swiperという変数にインスタンスを格納。
 const swiper = new Swiper(".swiper", {
    // スライドが最後になったら最初のスライドに戻りループする設定
    loop: true,
    // 画面のタッチやマウスドラッグでスライドを操作できないように設定 
    allowTouchMove: false,
    // スライドを自動で動くようにし、５秒ごとに切り替える設定
    autoplay: {
        delay: 5000,
    },
    // スライド切り替えのアニメーション速度を0.6秒に設定
    speed: 600,
     // ページネーションの設定
    pagination: {
        // ページネーションを.swiper-paginationの要素に表示
        el: '.swiper-pagination',
        // 表示形式を分数タイプに設定（例1/6）
        type: 'fraction',
        // 分数タイプのページネーションのHTMLの中身をカスタマイズする関数
        // currentClass:現在のページ番号を表示する<span>のクラス名（1/6の1の部分）
        // totalClass:総ページ番号を表示する<span>のクラス名（1/6の6の部分）
        renderFraction: function (currentClass, totalClass) {
            // 総ページの数字＋装飾＋現在のページの数字を動的に反映するよう設定
            return '<span class="' + totalClass + '"></span>' + '<span class="border js-border"><span></span></span>' + '<span class="' + currentClass + '"></span>';
        }
    },
    // パララックスを動作するよう設定
    parallax: true,
    // Swiperの各種イベントを設定するonオブジェクト
    on: {
        // Swiperの初期化完了時に呼ばれるイベント
        init: function () {
            // swiperの中のactivIndexつまり最初に表示されているスライドにadd-animationのクラスを追加
            const firstSlide = this.slides[this.activeIndex];
            firstSlide.classList.add('add-animation');
        },
        // スライドが変わった直後に呼ばれるイベント
        slideChange: function () {
            // ページネーション要素を取得
            const pagination = document.querySelector('.swiper-pagination');
            // ページネーションのisｰactiveクラスをアニメーション再スタート用の処理ため一旦削除。
            pagination.classList.remove('is-active');
            // CSSアニメーションを再スタートさせるために要素のレイアウト情報の読み取り
            void pagination.offsetWidth; // 再描画を強制
            // ページネーションにis-activeクラスを再付与して、アニメーションを再度開始
            pagination.classList.add('is-active');
        },
        // スライドが切り替わり始めた直後に呼ばれるイベント
        slideChangeTransitionStart: function () {
            // 
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


