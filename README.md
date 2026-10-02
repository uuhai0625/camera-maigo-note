# カメラ迷子ノート (camera-maigo-note)

カメラで迷った人たちの声を集めて、むずかしい言葉を使わずにまとめるカメラ入門サイトです。

公開URL: https://uuhai0625.github.io/camera-maigo-note/ (2026-10-02公開)

## 技術構成

- ビルド不要の静的サイト(素の HTML / CSS / JavaScript)。GitHub Pages で `main` 直下をそのまま公開する想定
- 固定ページ(トップ・このサイトについて・広告・プライバシー・言葉の意味・記事テンプレ・404・sitemap・robots)は `../tools/gen_pages.py` で生成する。**これらのHTMLを直接編集しない**(再生成で上書きされる)
- 言葉の意味ページは `../用語集.md` から自動生成
- 楽天アフィリエイトは `rakuten-shared.js`(検索リンクのみ。商品カードAPIは必要になったら相場ノートから移植)
- GA4は `ga.js`(測定IDは未設定、プロパティ作成後に入れる)

## ロゴ・アイコン・画像

- ロゴマーク(現在地ピン+レンズ)とアイコン6種(before/stuck/keep/caution/voice/term)の正本は `../tools/brand_assets.py`。`images/`のSVGはgen_pages.pyが書き出す
- OGP・ロゴPNG・SNS投稿画像は `../tools/export_images.py` でPCのChrome(ヘッドレス)から書き出す。費用なし
  - `base` → `images/ogp.png`・`logo-horizontal.png`・`logo-square-512.png`・`apple-touch-icon.png`
  - `article <slug> "<タイトル>" <before|stuck|keep>` → `<slug>/ogp.png`
  - `x-post "<見出し>" "<本文>" [出典]` / `note "<タイトル>"` → `../design/export/`(uuhai0625の既存アカウントでの先行発信用)

## 記事の追加手順

1. `_template/` をコピーして `<slug>/index.html` を作る(slugは `../tools/gen_pages.py` の `ARTICLES` と合わせる)
2. テンプレの `noindex`・canonical・og:url・パンくず・現在地チップを記事用に書き換える
3. 書き方は `../brand.md`(話し方・使わない言葉・公開前チェック)に従う。技術的な説明は `../用語集.md` と照合する
4. `python tools/export_images.py article <slug> "<タイトル>" <section>` で記事OGPを作り、記事HTMLのog:imageを `<slug>/ogp.png` のURLにする
5. `ARTICLES` の該当行を `published=True` にして `python tools/gen_pages.py` を実行(トップのリンクと sitemap に反映)

## ローカル確認

`_devserver.ps1` を実行すると http://localhost:8805/ で確認できる。確認が終わったら止める。
