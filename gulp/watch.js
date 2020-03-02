const { watch } = require('gulp');
const sass = require('./sass.js');
const config = require('./config.js');
const compile = require('./compile.js');

function watchTask(cb) {
    watch([config.scss.watch], sass);
    compile(cb, true);
}

module.exports = watchTask;