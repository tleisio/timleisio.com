var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');

gulp.task('process-js-libs', function() {
  return gulp.src([
      'src/js/libs/ko.js',
      'src/js/libs/knockout-postbox.min.js',
      'src/js/libs/TweenLite.min.js'])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/libs'));
});

gulp.task('process-js', function() {
  return gulp.src([
      'src/js/controller.js',
      'src/js/AppVM.js',
      'src/js/start-index.js'])
    .pipe(concat('main.js'))
    //.pipe(uglify())  //only uglify when deploying to production
    .pipe(gulp.dest('public/js'));
});

gulp.task('process-css', function() {
  return gulp.src('src/css/main.css')
    .pipe(cleanCss({}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch('src/css/*.css', ['process-css']);
  gulp.watch('src/js/*.js', ['process-js']);
});
  