const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");
const htmlBeautify = require("gulp-html-beautify");


function compileSass() {
    return gulp.src("../src/assets/sass/**/*.scss")
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssSorter()]))
        .pipe(mmq())
        .pipe(gulp.dest("../css/"))
}

function watch() {
    gulp.watch("../src/assets/sass/**/*.scss", compileSass);
    gulp.watch("../src/*.html", formatHTML);
}

function formatHTML() {
    return gulp.src("../src/*.html")
        .pipe(htmlBeautify({
            indent_size: 2,
            indent_with_tabs: true,
        }))
        .pipe(gulp.dest("../"))
}

function browserInit(done) {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}

exports.default = gulp.parallel(formatHTML, watch, compileSass);