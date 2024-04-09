import chokidar from 'chokidar';
import sass from 'sass';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src/scss');
const distDir = path.join(__dirname, 'dist/css');

// SCSSファイルの変更を監視
chokidar.watch(srcDir).on('change', (event) => {
  console.log(`Detected change in ${event}, recompiling...`);
  const result = sass.renderSync({
    file: path.join(srcDir, 'style.scss'),
    outFile: path.join(distDir, 'style.css'),
  });

  if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir, { recursive: true });
  }
  fs.writeFileSync(path.join(distDir, 'style.css'), result.css);
  console.log('SCSS compiled successfully.');
});
