var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var paths = {
    bower : './bower_components/',
    src: {
        scripts:    './src/scripts/',
        styles:     './src/styles/',
        html:       './src/templates/',
        images:     './src/images/'
    },
    dist: {
        js:     './dist/assets/js/',
        css:    './dist/assets/css/',
        html:   './dist/',
        img:    './dist/assets/img/'
    }
};

gulp.task('styles', function () {
    return gulp.src([
        paths.src.styles + 'app.scss'
    ])
        .pipe(sass({
            includePaths: [
                paths.bower + 'bootstrap-sass/assets/stylesheets',
                paths.bower + 'font-awesome/scss'
            ]
        }))
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('scripts', function () {
    return gulp.src([
        paths.bower + 'jquery/dist/jquery.js',
        paths.bower + 'bootstrap-sass/src/javascripts/bootstrap.js',
        paths.bower + 'angular/angular.js',
        paths.src.scripts + '**/*.js',
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('htmls', function () {
    return gulp.src(paths.src.html + '**/*.html')
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task('images', function () {
    return gulp.src(paths.src.images + '**/*.*')
        .pipe(gulp.dest(paths.dist.img));
});

gulp.task('watch', function () {
    gulp.watch(paths.src.styles + '**/*.scss', ['styles']);
    gulp.watch(paths.src.scripts + '**/*.js', ['scripts']);
    gulp.watch(paths.src.html + '**/*.html', ['htmls']);
});

gulp.task('default', ['styles','scripts','htmls', 'images']);