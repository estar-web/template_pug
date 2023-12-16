const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");
const htmlBeautify = require("gulp-html-beautify");
const browserSync = require("browser-sync");

/**
 * 変数設定
 */
const path = {
    root: 'src/',
    // data: 'src/_data/site.json',
    css: '/css/',
};

const src ={
    html: '*.html',
    sass: '/src/assets/sass/**/*.scss',
    php: '*.php',
    js: 'js/*.js',
}

const url ={
    //PHPを使う時にここを有効にしてローカルアドレス入力
    // local: "",
}


function compileSass() {
    return gulp.src(src.sass)
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssSorter()]))
        .pipe(mmq())
        .pipe(gulp.dest(path.css))
}

function watch() {
    gulp.watch(src.sass, gulp.series(compileSass, browserReload));
    gulp.watch(src.html, formatHTML);
    gulp.watch(src.php, browserReload);
    gulp.watch(src.js, browserReload);
}

function formatHTML() {
    return gulp.src(src.html)
        .pipe(htmlBeautify({
            indent_size: 2,
            indent_with_tabs: true,
        }))
        // .pipe(gulp.dest("/"))
}

function browserInit(done) {
    //PHPファイルを扱う時にここの処理を有効にする

    // browserSync.init({
    //     proxy: url.local,                  //各々のローカルホストアドレスを記載
    //     notify: false,                  // ブラウザ更新時に出てくる通知を非表示にする
    //     open: "external",                // ローカルIPアドレスでサーバを立ち上げる
    // });
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}

exports.default = gulp.parallel(formatHTML, watch, compileSass, browserInit);