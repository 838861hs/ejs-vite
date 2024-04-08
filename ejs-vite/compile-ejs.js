import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src/ejs');
const distDir = path.join(__dirname, 'dist');

const compileEJS = (file) => {
  const fileName = path.basename(file, '.ejs');

  // ファイル名が "_" で始まる場合はコンパイルをスキップ
  if (fileName.startsWith('_')) {
    console.log(`Skipping partial: ${fileName}.ejs`);
    return;
  }

  ejs.renderFile(file, {}, {}, (err, html) => {
    if (err) {
      console.error(err);
      return;
    }
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distDir, `${fileName}.html`), html);
    console.log(`${fileName}.html has been compiled`);
  });
};

// src/ejs ディレクトリ内の EJS ファイルの変更を監視
chokidar.watch(`${srcDir}/**/*.ejs`).on('change', (file) => {
  console.log(`Detected change in ${file}, recompiling...`);
  compileEJS(file);
});

// 初期起動時に条件に一致する全EJSファイルをコンパイル
fs.readdirSync(srcDir).forEach(file => {
  if (path.extname(file) === '.ejs' && !path.basename(file).startsWith('_')) {
    compileEJS(path.join(srcDir, file));
  }
});
