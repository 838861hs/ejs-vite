import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ejsFilePath = path.join(__dirname, 'src/ejs/index.ejs');
const outputDir = path.join(__dirname, 'dist'); 

ejs.renderFile(ejsFilePath, {}, {}, function(err, html) {
  if (err) {
    console.error(err);
    return;
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
  console.log('EJS compiled to HTML successfully.');
});
