import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // 開発サーバーのルートを dist ディレクトリに設定
  root: path.resolve(__dirname, 'dist'),
  server: {
    // 開発中はデフォルトポート（例えば 3000）を使用
    port: 3000,
    // サーバー起動時にブラウザを自動で開く
    open: true,
    watch: {
      // ポーリングを使用してファイルシステムの変更を検出（必要に応じて）
      usePolling: true,
    },
  },
});
