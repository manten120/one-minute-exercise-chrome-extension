const siteUrl = "https://rocky-basin-37839.herokuapp.com/main";

// ※constやletをつかうとpopup.jsから呼び出せないためvarをつかう
// 時刻とsiteUrlを開くかを表す真偽値のペア
// "8: true"ならば8時0分にsiteUrlを開く
var flags = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  13: true,
  14: true,
  15: true,
  16: true,
  17: true,
  18: true,
  19: true,
  20: true,
  21: true,
  22: true,
  23: true,
};

// chrome storageにflagsが保存されているならばそれを使う
chrome.storage.local.get(['flags'], (result) => {
  if (result.flags) {
    flags = result.flags;
  }
});

// popup.jsから呼び出し、flagsの真偽値をトグルする
var toggleFlags = (time) => {
  flags[time] = !flags[time];
  // chrome storage に flags を保存する
  chrome.storage.local.set({ flags });
  console.log(flags);
}

// 自動で開いたウインドウを特定するIDが入る
// 自動で閉じたときundefinedが入る
let windowId;

const goToSite = () => {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const isFlagged = flags[hour];

  if (isFlagged && min===0 && !windowId) {
    // 新しいウインドウのフルスクリーンでsiteUrlを開く
    chrome.windows.create({url: siteUrl, state: 'fullscreen'}, (newWindow) => {
      windowId = newWindow.id;
    });
  } 
  else if (isFlagged && min===0 && windowId){
    // F11キーでフルスクリーンを解除するとウインドウが操作不能になる(バグ？)ため
    // フルスクリーンが解除されていたらウインドウを閉じる
    chrome.windows.get(windowId, (window) => {
      if (window.state === 'normal') {
        chrome.windows.remove(windowId);
        // 新しいウインドウでsiteUrlを開く
        chrome.windows.create({url: siteUrl, state: 'fullscreen'}, (newWindow) => {
          windowId = newWindow.id;
        });
      }
    });
  }
  else if (windowId) {
    // 毎時1分以降にフルスクリーンを解除した場合ウインドウを閉じる
    chrome.windows.get(windowId, (window) => {
      if (window.state === 'normal') {
        chrome.windows.remove(windowId);
        windowId = undefined;
      }
    });
  }

  setTimeout(goToSite, 5000);
}

goToSite();

// サイトでエクササイズメニューをクリックしてからx秒後にウインドウを閉じる
chrome.runtime.onMessage.addListener((request) => {
  // contentScript.jsからメッセージをうけとったらcb関数が実行される

  // 受け取ったメッセージをバックグランドページに出力 ".img-menusがクリックされました"
  console.log(request)
  
  // x秒後にウインドウを閉じる
  // (タイマー作動まで1秒+エクササイズ時間60秒+タイマー作動まで3秒+コミュニケーション時間15秒+原因不明の遅れのため調整3秒)
  const x = 82;
  setTimeout(() => {
    if (!windowId) { return }
    chrome.windows.remove(windowId);
    windowId = undefined;
  }, x * 1000)
});
