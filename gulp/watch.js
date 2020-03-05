const { watch } = require('gulp');
const sass = require('./sass.js');
const config = require('./config.js');
const compile = require('./compile.js');
const copy = require('./copy.js');

function watchTask(cb) {
    watch([config.scss.watch], sass);
    watch([config.common.entry], copy);
    compile(cb, true);
}

module.exports = watchTask;