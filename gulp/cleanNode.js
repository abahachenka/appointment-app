const del = require('del');

function cleanNode() {
    return del([
        'node_modules',
    ]);
}

module.exports = cleanNode;