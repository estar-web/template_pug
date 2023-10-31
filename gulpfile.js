const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");
const htmlBeautify = require("gulp-html-beautify");
const browserSync = require("browser-sync");

/**
 * 開発用ディレクトリ
 */
const src = {
    root: 'src/',
    sass: ''

    data: 'src/_data/',
  };

function compileSass() {
    return gulp.src("/src/assets/sass/**/*.scss")
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssSorter()]))
        .pipe(mmq())
        .pipe(gulp.dest("/css/"))
}

function watch() {
    gulp.watch("/src/assets/sass/**/*.scss", gulp.series(compileSass,browserReload));
    gulp.watch("/src/*.html", formatHTML);
    gulp.watch("/*.php",browserReload);
    gulp.watch("/js/*.js",browserReload);
}

function formatHTML() {
    return gulp.src("/src/*.html")
        .pipe(htmlBeautify({
            indent_size: 2,
            indent_with_tabs: true,
        }))
        .pipe(gulp.dest("/"))
}

function browserInit(done) {
    browserSync.init({
        proxy: "", //各々のローカルホストアドレスを記載
        notify: false,                  // ブラウザ更新時に出てくる通知を非表示にする
        open: "external",                // ローカルIPアドレスでサーバを立ち上げる
    });
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}

exports.default = gulp.parallel(formatHTML, watch, compileSass,browserInit);