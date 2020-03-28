module.exports = {
    common: {
        entry: 'index.html',
        dest: './public/'
    },
    img: {
        src: './src/img/**/*',
        dest: './public/img/'
    },
    js: {
        src: './src/index.js',
        output: 'bundle.js'
    },
    scss: {
        src: './src/scss/index.scss',
        dest: './public/',
        watch: './src/scss/**/*.scss'
    }
};