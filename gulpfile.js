var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');
var del = require('del');
var cache = require('gulp-cache');




gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    })
})

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', ['sass']);
    // Other watchers
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
})
gulp.task('images', function(){
    return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('gulp/img'))
});
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('gulp/fonts'))
})
gulp.task('useref', function(){
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('gulp'))
});
gulp.task('clean:gulp', function() {
    return del.sync('gulp');
})
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})
gulp.task('build', function () {
    runSequence('clean:gulp',
        ['sass', 'useref', 'images', 'fonts'],
    )
})
gulp.task('default', function (callback) {
    runSequence(['sass','browserSync'], 'watch',
        callback
    )
})
