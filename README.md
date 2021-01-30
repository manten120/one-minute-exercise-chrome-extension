<div align="center">
<img src="https://user-images.githubusercontent.com/61675236/106335846-efc02a00-62d0-11eb-9fde-61f7bba40b59.jpg" alt="拡張機能">
</div>
<h2 align="center">「強制!!１分間エクササイズ」用 Chrome拡張機能</h2>

<br/>

[「強制!!１分間エクササイズ」](https://rocky-basin-37839.herokuapp.com)

<br/>

サイト[「強制!!１分間エクササイズ」](https://rocky-basin-37839.herokuapp.com) ([GitHubリポジトリ](https://github.com/manten120/one-minute-exercise)) の[エクササイズページ(未ログインの場合トップページのログインフォーム)](https://rocky-basin-37839.herokuapp.com/main)を、毎時0分に新規ウインドウのフルスクリーンで開く。その後60秒間閉じることを禁止し、エクササイズを開始してから約90秒後に自動で閉じる。ポップアップ(上記画像)にて開く時間を設定できる。

<br />

### 開発時メモ

`jquery-3.5.1.min.js`を`lib/`に置いたところ`contentScript.js`から読み込めず、`manifest.json`でパスを書き換えても解決できなかったため、プロジェクトルートに置いている。