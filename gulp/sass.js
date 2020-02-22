const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const config = require('./config.js');

function sassTask() {
    return src(config.files.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(config.files.scss.dest));
}

module.exports = sassTask;