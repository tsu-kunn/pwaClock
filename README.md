# pwaClock
Reactで作るPWAの時計。\
appClockからの移植で、ElectronアプリではなくPWAアプリとして作成。\
(2022/1/24 appClockから独立していく)

ベースプロジェクトは公式の通り。

```
$ npx create-react-app pwaclock --template cra-template-pwa
```

[Making a Progressive Web App](https://create-react-app.dev/docs/making-a-progressive-web-app/)

## 公開ページ
[pwaclock](https://tsu-kunn.github.io/pwaclock/)

## フォルダ構成
- .vscode
  - React と PWA をVSCodeでデバッグするためのファイル
- build
  - `npm run build` で作られた公開用ファイル
- public
  - index.html など基本的なファイルが入っているところ
- src
  - React + PWAおよび、これらで使われるファイルが入っているところ

## 画像
- Indigo_01.png
- Indigo_02.png
  - https://arknights.wikiru.jp/index.php?%A5%A4%A5%F3%A5%C7%A5%A3%A5%B4

