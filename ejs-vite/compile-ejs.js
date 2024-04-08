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
  ejs.renderFile(file, {}, {}, (err, str) => {
    if (err) {
      console.error(err);
      return;
    }
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distDir, `${fileName}.html`), str);
    console.log(`${fileName}.html has been compiled`);
  });
};

chokidar.watch(`${srcDir}/**/*.ejs`).on('change', (file) => {
  console.log(`Detected change in ${file}, recompiling...`);
  compileEJS(file);
});

compileEJS(path.join(srcDir, 'index.ejs'));
