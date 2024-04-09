import esbuild from 'esbuild';
import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src/js');
const outDir = path.join(__dirname, 'dist/js');

// 全ファイルをビルドする関数
const buildAllFiles = () => {
  // src/js ディレクトリを読み込んで全ファイルを取得
  const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.js'));

  // 各ファイルをビルド
  files.forEach(file => {
    const filePath = path.join(srcDir, file);
    const outFilePath = path.join(outDir, file);
    esbuild.build({
      entryPoints: [filePath],
      bundle: true,
      outfile: outFilePath,
      sourcemap: false,
    }).catch(() => process.exit(1));
  });
};

// ファイルの変更を監視
chokidar.watch(srcDir).on('change', () => {
  console.log('Changes detected. Rebuilding all files...');
  buildAllFiles();
});

// 初回実行で全ファイルをビルド
buildAllFiles();
