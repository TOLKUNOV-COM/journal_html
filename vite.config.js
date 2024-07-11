import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue'
import pugPlugin from 'vite-plugin-pug';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
// import tailwindcss from 'tailwindcss';

const pugOptions = { pretty: true } // FIXME: pug pretty is deprecated!

// Чтение и парсинг YAML файла
const pugLocalsFilePath = path.resolve(__dirname, './src/template_locals.yml');

function getPugLocals() {
    const yamlContent = fs.readFileSync(pugLocalsFilePath, 'utf8');
    return yaml.load(yamlContent);
}

let currentLocals = getPugLocals();

export default defineConfig({
    root: './src', // Указываем корневую директорию для исходных файлов
    build: {
        outDir: '../dist', // Указываем директорию для сборки
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, './src/index.html'),
            }
        }
    },
    plugins: [
        vue(),
        pugPlugin(pugOptions, currentLocals),
        {
            name: 'watch-yaml',
            configureServer(server) {
                chokidar.watch(pugLocalsFilePath).on('change', () => {
                    console.log('template_local.yml changed, reloading Pug templates...');
                    currentLocals = getPugLocals();

                    // Пересобрать все Pug-шаблоны
                    server.restart();
                });
            },
        },
    ],
    define: {}
});
