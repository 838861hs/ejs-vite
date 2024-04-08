import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'dist'), // 開発サーバーのルートを `dist` に設定
  build: {
    outDir: path.resolve(__dirname, 'dist'), // ビルド出力先も `dist` に
  },
});
