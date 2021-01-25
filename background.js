const siteUrl = "https://rocky-basin-37839.herokuapp.com/main";

// ※constやletをつかうとpopup.jsから呼び出せないためvarをつかう
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

chrome.storage.local.get(['flags'], (result) => {
  if (result.flags) {
    flags = result.flags;
  }
});

// ※constやletをつかうとpopup.jsから呼び出せないためvarをつかう
var toggleFlags = (time) => {
  flags[time] = !flags[time];
  chrome.storage.local.set({ flags });
}

let windowId; // undefined

const goToSite = () => {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes(); 
  const isFlagged = flags[hour];

  if (isFlagged && min%3===0 && !windowId) {
    // 新しいウインドウのフルスクリーンでsiteUrlを開く
    chrome.windows.create({url: siteUrl, state: 'fullscreen'}, (newWindow) => {
      windowId = newWindow.id;
    });
  } 
  else if (isFlagged && min%3===0 && windowId){
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

chrome.runtime.onMessage.addListener((request) => {
  // contentScript.jsからメッセージをうけとったらcb関数を実行する

  // 受け取ったメッセージをバックグランドページに出力 ".img-menusがクリックされました"
  console.log(request)
  
  // x秒後にウインドウを閉じる
  const x = 70
  setTimeout(() => {
    console.log('here2');
    chrome.windows.remove(windowId);
    windowId = undefined;
  }, x * 1000)
});
