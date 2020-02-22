const { watch } = require('gulp');
const sass = require('./sass.js');
const config = require('./config.js');

function watchTask(cb) {
    watch([config.files.scss.watch], sass);

    cb();
}

module.exports = watchTask;