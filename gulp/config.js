module.exports = {
    common: {
        entry: 'index.html',
        dest: './public/'
    },
    js: {
        src: './src/index.js',
        output: 'bundle.js'
    },
    scss: {
        src: './static/scss/index.scss',
        dest: './public/',
        watch: './static/scss/**/*.scss'
    }
};