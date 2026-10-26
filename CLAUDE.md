# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code 向けのガイドです。

## プロジェクト概要

task-board: タスク管理ボードアプリケーション。

### 技術スタック

- React 19 + Vite（JavaScript / JSX）
- スタイルは素の CSS（`src/App.css`）
- タスクはブラウザの localStorage（キー: `task-board.tasks`）に保存する

### ディレクトリ構成

- `index.html` … エントリーの HTML
- `src/main.jsx` … React のマウント
- `src/App.jsx` … タスクボード本体（追加・完了切り替え・削除）
- `src/App.css` … スタイル

### 開発コマンド

- `npm install` … 依存パッケージのインストール
- `npm run dev` … 開発サーバー起動（http://localhost:5173）
- `npm run build` … 本番ビルド（`dist/` に出力）
- `npm run preview` … ビルド結果の確認

### 公開（GitHub Pages）

- 公開URL: https://umebon4811.github.io/task-board/
- `main` へのプッシュで `.github/workflows/deploy.yml` が動き、自動でビルド・公開される
- ビルド時の `base` は `/task-board/`（`vite.config.js`）。リポジトリ名を変えたらここも合わせる

## コミュニケーション

- 応答・コミットメッセージ・コード内コメントは日本語で書く。

## Git 運用ルール

### 基本方針: 変更のたびに GitHub へプッシュする

- コードを変更したら、作業単位ごとに必ずコミットし、そのまま GitHub（`origin`）へプッシュする。
- 変更をローカルに溜め込まない。1つの作業が終わった時点で「コミット → プッシュ」まで完了させる。
- プッシュに失敗した場合（認証エラー、リモートとの競合など）は、強制プッシュで解決せず、原因をユーザーに報告する。

### 手順

1. `git status` / `git diff` で変更内容を確認する
2. 関係するファイルだけを `git add` でステージする（`.env` や認証情報などの秘密情報は絶対にコミットしない）
3. 変更内容が分かるメッセージでコミットする
4. `git push` で GitHub へプッシュする

### コミットメッセージ

- 1行目に変更の要約を簡潔に書く（例: `タスクの並び替え機能を追加`）
- 必要に応じて空行を挟み、変更理由や詳細を書く
- 1コミット = 1つの論理的な変更 を心がける

### 禁止事項

- `git push --force` などの強制プッシュは、ユーザーの明示的な指示がない限り行わない
- `--no-verify` でフックを回避しない
- 秘密情報（APIキー、パスワード、`.env` ファイル等）をコミットしない
