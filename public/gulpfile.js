var gulp = require('gulp');
var uglifyjs = require('gulp-uglifyjs');
var concat = require('gulp-concat');

gulp.task('default', function() {
  gulp.src('../*.js')
  .pipe(uglifyjs('app.min.js', {
      outSourceMap: true
    }))
  .pipe(gulp.dest('app/'));
    gulp.src('../*.js')
        .pipe(concat('jdoc.js'))
        .pipe(gulp.dest('app/'));
  
});