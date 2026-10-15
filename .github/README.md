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
- イラスト・写真(2026-10-03〜)は `images/illust/`・`images/photo/` の WebP。台帳は `../tools/images.py`、変換は `../tools/prep_image.py`(本体・720px版 `-m`・一覧サムネ `-s`)。記事中は原稿に `<!-- IMG:key -->`、アイキャッチとトップの一覧サムネは EYECATCH から自動
  - `base` → `images/ogp.png`・`logo-horizontal.png`・`logo-square-512.png`・`apple-touch-icon.png`
  - `article <slug> "<タイトル>" <before|stuck|keep>` → `<slug>/ogp.png`
  - `x-post "<見出し>" "<本文>" [出典]` / `note "<タイトル>"` → `../design/export/`(uuhai0625の既存アカウントでの先行発信用)

## 記事の追加手順(2026-10-16 更新。正本は `../記事執筆ガイド.md`)

1. `../原稿/<slug>.md` を書く(1行目 `# タイトル`、2行目 `description: …`)。書き方は `../brand.md` と `../記事執筆ガイド.md`、技術的な説明は `../用語集.md` と照合する
2. `../tools/gen_pages.py` の `ARTICLES` に行を足す(タイトルは原稿1行目と同じにする。違うとビルドが止まる)。「次に読むなら」は `build_article.py` の `NEXT`
3. `python tools/export_images.py article <slug> "<改行入りタイトル>" <before|stuck|keep>` で記事OGPを作る
4. `python tools/build_article.py <slug> <公開日> <更新日>` → `python tools/gen_pages.py`
   - 日付を省くと、公開済みの記事は今のHTMLの日付を引き継ぐ(新規だけ今日)。更新日を前より古くするとエラー
   - タイトル不一致・変換されずに残った記法・id重複・ページ内リンク切れ・記事リンク切れ・表の列数違い・注意枠の閉じ忘れ・出典行の重複・未知のAFFキー・レンタル/買取カードの前の注意枠なし、はビルドが止まる
5. 改題したら、公開済みの全記事をビルドし直す(「次に読むなら」と用語集に旧タイトルが残るため)

`_template/` は見た目の確認用で、記事作成には使わない。

## ローカル確認

`_devserver.ps1` を実行すると http://localhost:8805/ で確認できる。確認が終わったら止める。
