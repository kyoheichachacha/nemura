
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
            // 直前のスライドのインデックス番号を取得
            const prevIndex = this.previousIndex;
            // 今回表示されるスライドのインデックス番号を取得
            const nextIndex = this.activeIndex;
            // スライド幅にインデックス番号をかけて、前のスライドの左端の位置を計算
            const currentOffset = -prevIndex * this.width;
            // 上と同様に、次のスライドの左端の位置を計算
            const fullOffset = -nextIndex * this.width;
            // 前スライドと次スライドの20％の地点を計算
            const midOffset = currentOffset + (fullOffset - currentOffset) * 0.2;
            
            // 次に表示されるスライド自体の要素を取得
            const nextSlide = this.slides[this.activeIndex];
            // 次スライドに.add-animationクラスを追加
            nextSlide.classList.add('add-animation');
            
            // 700msかけて20％までスライドを移動
                this.setTransition(700); // 0.4秒
                this.setTranslate(midOffset);
            
            setTimeout(() => {
                // 残り80%のスライドを400msで移動
                this.setTransition(400); // 0.5秒
                this.setTranslate(fullOffset);
            }, 400);
            
        },
    },
});
// 画面サイズに応じてSwiperのスライド方向を動的に切り替える関数
function updateSwiperDirection() {
    // 現在のウインドウ幅を取得
    const w = window.innerWidth;
    // 横幅が969px〜561pxなら右から左にスライド、それ以外は左から右にスライド
    const isRTL = (w >= 561 && w <= 959) ? true : false;
    //　Swiperが現在右から左にスライドしているかどうかを取得
    const currentDir = swiper.rtlTranslate;
    // 必要な時だけSwiperの言語向き・スライド向きを切り替える処理
    if (isRTL !== currentDir) {
    　// Swiperも言語方向（内部のdir属性）の切り替え
      swiper.changeLanguageDirection(isRTL ? 'rtl' : 'ltr'); 
    　//　スライド方向は横のまま固定（rtlの設定変更時の再初期化のため）
      swiper.changeDirection('horizontal', false); 
    }
  }
  
  // jQueryの「ページ読み込み完了」イベント
  $(function () {
    // 現在のウィンドウ幅に合わせてスライドの方向を設定
    updateSwiperDirection();
  　// 画面の幅が変わった時に実行されるイベント
    $(window).on('resize', function () {
    　// 画面の幅を変えた時の処理を何回も実行しないためにタイマーの実行をキャンセルする関数
      clearTimeout(window._swiperResizeTimer);
    　// 最後のリサイズ操作から300ms後に、updateSwiperDirection() を実行する処理
      window._swiperResizeTimer = setTimeout(updateSwiperDirection, 300);
    });
});


