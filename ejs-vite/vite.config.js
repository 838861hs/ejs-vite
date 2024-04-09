// Viteの設定関数とpathモジュールをインポート
import { defineConfig } from 'vite';
import path from 'path';
// vite-plugin-copy を名前付きインポート
import { copy } from 'vite-plugin-copy';

export default defineConfig({
  // 開発サーバーの設定
  root: path.resolve(__dirname, 'dist'),
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
    },
  },
  // プラグインの設定
  plugins: [
    // src/imagesディレクトリの内容をdist/imagesにコピーする設定
    copy({
      targets: [
        { src: 'src/images/*', dest: 'dist/images' }
      ]
    })
  ]
});
