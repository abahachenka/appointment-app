const requireDir = require('require-dir');
const { series, parallel } = require('gulp');
const { sass, watch, copy, compile, clean, cleanNode} = requireDir('./gulp');

exports.default = series(
    clean,
    copy,
    sass,
    watch
);
exports.sass = sass;
exports.build = compile;
exports.clean = clean;
exports.cleanNode = cleanNode;