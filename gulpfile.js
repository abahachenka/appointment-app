const requireDir = require('require-dir');
const { series, parallel } = require('gulp');
const { sass, watch } = requireDir('./gulp');

exports.default = series(
    sass,
    watch
);
exports.sass = sass;
