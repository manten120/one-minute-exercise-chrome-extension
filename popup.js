// background.jsの変数、関数を格納したオブジェクト
const BG = chrome.extension.getBackgroundPage();

// chrome storage に保存されたflagsの値をbackgroud.js経由で取得する
const flags = BG.flags;

// flagsの値を用いてチェックボックスの状態を復元する
$('.form-check-input').each((index, element) => {
  if (flags[index]) {
    $(element).prop('checked', true);
  } else {
    $(element).prop('checked', false);
  }
});

$('.form-check-input').on('click', function() {
  const checkBox = $(this);
  const time = checkBox.attr('id').replace('check', '');
  // background.jsのなかでtoggleFlags()を実行し
  // background.jsのなかのflagsの値をトグルし
  // chrome storage に保存する
  BG.toggleFlags(time);
});

// ポップアップを閉じる
$('#close-popup').on('click', function() {
  window.close();
});