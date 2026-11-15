# MERON Portfolio

参考画像のレイアウト・タイポグラフィ・文章構成を参考に、Angular で各ページを個別に再構成した近未来的なポートフォリオサイトです。参考画像そのものをページ背景にせず、人物・会議・製品などの写真部分を個別の画像素材として使用しています。ASP.NET Core Web API も含みます。

## 必要な環境

- Node.js と npm
- .NET 10 SDK（バックエンドを起動する場合）

## 開発環境の起動

API とフロントエンドを、それぞれ別のターミナルで起動します。

```powershell
cd backend\Homepage.Api
dotnet run
```

```powershell
cd frontend
npm start
```

フロントエンドは `http://localhost:4200`、API は `http://localhost:5080` で起動します。Angular の開発プロキシにより、フロントエンドの `/api` リクエストは API に転送されます。

API の疎通確認: `http://localhost:5080/api/health`

## Vercel へのデプロイ

Vercel の Project Settings で Root Directory を `frontend` に設定してデプロイします。ルートの `vercel.json` が Angular アプリをビルドし、SPA の各 URL を `index.html` にルーティングします。

## ページ

- Main Menu: `/`
- Profile: `/profile`
- Mission / Vision: `/mission-vision`
- Achievements: `/achievements`
- Contract Company: `/contract-company`
- Hobby: `/hobby`

## 画像・文章・SNSリンクの編集

各ページの「このページを編集」から、見出し・文章・セクション内の項目・画像・SNS リンクを編集できます。セクション内の項目は追加・削除もできます。画像はファイルをアップロードするか、画像の URL またはパスを入力してください。アップロード画像は 1.5MB 以下です。変更はブラウザーのローカルストレージに保存されるため、別の端末には自動同期されません。

SNS リンクも同じ編集画面から更新できます。初期値は各 SNS のトップページです。公開時には、ご自身のプロフィール URL に差し替えてください。

オリジナルの参考画像は `model\`、各レイアウト用に切り出した写真は `frontend\public\images\` にあります。既定のページ画像・文章・各セクションの内容は `frontend\src\app\page-content.ts` で変更できます。

## ビルドとテスト

```powershell
cd frontend
npm run build
npm test -- --watch=false
```
