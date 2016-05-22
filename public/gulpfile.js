var gulp = require('gulp');
var uglifyjs = require('gulp-uglifyjs');

gulp.task('default', function() {
  gulp.src('../*.js')
  .pipe(uglifyjs('app.min.js', {
      outSourceMap: true
    }))
  .pipe(gulp.dest('app/'));
  
});