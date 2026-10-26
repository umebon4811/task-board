import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages では https://umebon4811.github.io/task-board/ で配信されるため、
// ビルド時だけ base をリポジトリ名に合わせる（開発サーバーは / のまま）
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/task-board/' : '/',
}))
