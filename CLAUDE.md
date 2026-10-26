# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code 向けのガイドです。

## プロジェクト概要

task-board: タスク管理ボードアプリケーション。

### ディレクトリ構成

- `index.html` … エントリーの HTML
- `src/main.jsx` … React のマウント
- `src/App.jsx` … タスクボード本体（追加・完了切り替え・削除）
- `src/App.css` … スタイル
- `.github/workflows/deploy.yml` … GitHub Pages への自動デプロイ

### 開発コマンド

- `npm install` … 依存パッケージのインストール
- `npm run dev` … 開発サーバー起動（http://localhost:5173）
- `npm run build` … 本番ビルド（`dist/` に出力）
- `npm run preview` … ビルド結果の確認

## 技術スタック

| 分類 | 使用技術 |
|---|---|
| UI ライブラリ | React 19（`react` / `react-dom`） |
| ビルドツール | Vite 8 + `@vitejs/plugin-react` |
| 言語 | JavaScript（JSX）。TypeScript は使っていない |
| スタイル | 素の CSS（`src/App.css`）。CSS フレームワーク・CSS-in-JS は使っていない |
| 状態管理 | React の `useState` / `useEffect` のみ。外部ライブラリは使っていない |
| データ保存 | ブラウザの localStorage（キー: `task-board.tasks`）。サーバー・DB はない |
| 実行環境 | Node.js 24（CI も同じバージョン） |
| ホスティング | GitHub Pages（GitHub Actions でビルド・デプロイ） |

- 新しいライブラリを追加するときは、本当に必要かを先にユーザーに確認する

## デプロイ先

https://umebon4811.github.io/task-board/

- `main` へのプッシュで `.github/workflows/deploy.yml` が動き、自動でビルド・公開される
- ビルド時の `base` は `/task-board/`（`vite.config.js`）。リポジトリ名を変えたらここも合わせる

## コンポーネントの命名規約

現在のコード（`src/App.jsx`）に合わせた規約。新しいコードもこれに従う。

| 対象 | 規約 | 例 |
|---|---|---|
| コンポーネント名 | PascalCase | `App`, `TaskItem` |
| コンポーネントのファイル | コンポーネント名と同じ PascalCase + `.jsx`（1ファイル1コンポーネント） | `App.jsx`, `TaskItem.jsx` |
| コンポーネントの定義 | `function` 宣言 + `export default` | `export default function App() {}` |
| イベント処理の関数 | 動詞 + 名詞の camelCase | `addTask`, `toggleTask`, `deleteTask` |
| props で渡すイベント | `on` + 動詞 | `onToggle`, `onDelete` |
| state | 名詞の camelCase。更新関数は `set` + 名前 | `tasks` / `setTasks` |
| 真偽値 | 状態を表す形容詞・過去分詞 | `done` |
| 定数 | UPPER_SNAKE_CASE | `STORAGE_KEY` |
| CSS クラス | kebab-case。状態は別クラスで足す | `task-list`, `add-form`, `task done` |
| CSS ファイル | 対応するコンポーネントと同じ名前 | `App.css` |

- コンポーネントを分けるときは `src/components/` に置く
- 画面に出す文言・コメントは日本語で書く

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
