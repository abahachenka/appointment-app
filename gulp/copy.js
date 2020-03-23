const {src, dest} = require('gulp');
const config = require('./config.js');

function copy (cb) {
    src(config.common.entry)
        .pipe(dest(config.common.dest));

    src(config.img.src)
        .pipe(dest(config.img.dest));
        

    cb();
}

module.exports = copy;