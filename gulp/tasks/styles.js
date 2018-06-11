let gulp = require('gulp'),
postCSS = require('gulp-postcss'),
autoPrefixer = require('autoprefixer'),
cssImport = require('postcss-import'),
nested = require('postcss-nested');

gulp.task('styles', function(){
  return gulp.src('./app/src/styles/styles.css')
  .pipe(postCSS([cssImport,nested,autoPrefixer({ browsers: ["> 0%"] })]))
  .on('error', function(errorInfo){
    console.log(errorInfo.toString());
    this.emit('end');
  })
  .pipe(gulp.dest('./app/dist/styles'));
});

