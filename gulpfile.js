var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// JS processors
// var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify     = require('gulp-uglify');

// CSS/SCSS processors
var autoprefixer = require('autoprefixer');
var concat       = require('gulp-concat');
var postcss      = require('gulp-postcss');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// general reload script for mutliple file types
gulp.task('reload', function(done) {
    browserSync.reload();
    done();
})

// Process sass files and output prefixed css
gulp.task('styles', ['reload'], function(done) {
    gulp.src('./styles/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./styles/'));

    done();
});

// Place all watch tasks in one function for readability
gulp.task('watch', function() {
    // Concat styles on sass or scss file change
    gulp.watch('**/*.{sass,scss}', ['styles']);

    // Perform js tasks when js files change
    gulp.watch("js/*.js", ['js-watch']);

    // Reload on change of any source files
    gulp.watch('**/*.{css,html}', ['reload']);

})

gulp.task('browsersync', function() {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: true,
    });
})

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['js', 'browsersync', 'watch']);
