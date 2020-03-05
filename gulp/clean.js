const del = require('del');

function clean() {
    return del([
        'public/bundle.js',
        'public/bundle.js.map',
        'public/index.css',
        'public/index.css.map',
        'public/index.html'
    ]);
}

module.exports = clean;