// サイトでエクササイズメニューをクリックしたときのイベント
$('.img-menus').on('click', function() {
  // background.jsにメッセージを送る
  chrome.runtime.sendMessage('.img-menusがクリックされました')
});

// 右クリック禁止
$(document).on('contextmenu', function() {
  return false;
});