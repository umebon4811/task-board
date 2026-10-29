# 不動産管理アプリ

Supabase 認証付きの物件一覧アプリ（React + Vite）。

## セットアップ

1. `.env.example` を `.env` にコピーし、Supabase の Project URL と Publishable key を設定する
2. `npm install`
3. `npm run dev` で http://localhost:5173 を開く

## 画面

- `#/login` … ログイン
- `#/signup` … 会員登録
- `#/properties` … 物件一覧（ログイン必須。未ログインならログイン画面へリダイレクト）

## 注意

Supabase の初期設定では会員登録時に確認メールが送られます。
すぐ試したい場合は Supabase ダッシュボードの Authentication → Sign In / Providers → Email で
「Confirm email」をオフにしてください。
