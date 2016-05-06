var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var inject = require('gulp-inject')
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function(done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn(jekyll, ['build'], {
            stdio: 'inherit'
        })
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        open: false,
        notify: false,
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function() {
    return gulp.src('_sass/combine.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 2 versions', 'ie >= 9'], {
            cascade: true
        }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('css'));
});

/**
 * Compile files from _js into _site
 */
gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(gulp.dest('_site/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('js'));
});

/**
 * Inline svg into document
 */
gulp.task('svgstore', function() {
    var svgs = gulp
        .src('_svg/*.svg')
        .pipe(svgmin())
        .pipe(rename({
            prefix: 'jc-svg-'
        }))
        .pipe(svgstore({
            inlineSvg: true
        }));

    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('_includes/svg.html')
        .pipe(inject(svgs, {
            transform: fileContents
        }))
        .pipe(gulp.dest('_includes'));
});

/**
 * Minify images
 */
gulp.task('images', function() {
    return gulp.src('_images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('_images'));
});

/**
 * Clean _site folder
 */
gulp.task('clean', function() {
    return gulp.src('_site', {
            read: false
        })
        .pipe(clean());
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
    gulp.watch('_images/*', ['images']);
    gulp.watch('_svg/*.svg', ['svgstore']);
    gulp.watch('_sass/*.scss', ['sass']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/*', '_work/*.html'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['clean', 'browser-sync', 'watch']);
