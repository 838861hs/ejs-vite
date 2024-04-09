// copy-images.js
import chokidar from 'chokidar';
import fs from 'fs-extra';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = path.join(__dirname, 'src/images');
const destDir = path.join(__dirname, 'dist/images');

// src/images から dist/images へのコピー関数
function copyImages() {
  fs.copy(srcDir, destDir, (err) => {
    if (err) {
      console.error('Error copying images:', err);
    } else {
      console.log('Images copied successfully.');
    }
  });
}

// src/images ディレクトリを監視
chokidar.watch(srcDir).on('all', () => {
  console.log('Detected change, copying images...');
  copyImages();
});

// 初回実行で画像をコピー
copyImages();
