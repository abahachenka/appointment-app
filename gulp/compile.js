const { dest } = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const watchify = require('watchify');
const config = require('./config');

function compile(cb, isWatch) {
    const bundler = watchify(
            browserify(config.js.src, { debug: true })
            .transform(babelify, {
                presets: [
                    "@babel/preset-env", 
                    "@babel/preset-react"
                ]
            })
        );

    function rebundle() {
        bundler
            .bundle()
            .on('error', function(err) { 
                console.error(err); 
                this.emit('end'); 
            })
            .pipe(source(config.js.output))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(dest(config.common.dest));
    }

    if (isWatch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
    cb();
}

module.exports = compile;