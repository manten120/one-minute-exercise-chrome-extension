$('.img-menus').on('click', function() {
  // background.jsにメッセージを送る
  chrome.runtime.sendMessage('.img-menusがクリックされました')
});