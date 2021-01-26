// サイトでエクササイズメニューをクリックしたときのイベント
$('.img-menus').on('click', function() {
  // background.jsにメッセージを送る
  chrome.runtime.sendMessage('.img-menusがクリックされました')
});

// F11キー禁止
$(document).keydown(function(e){
  if(e.key === 'F11'){
      return false;
  }
});

// 右クリック禁止
$(document).on('contextmenu', function() {
  return false;
});