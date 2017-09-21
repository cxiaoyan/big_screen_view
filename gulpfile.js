var gulp = require('gulp')
var less = require('gulp-less')

gulp.task('less', function () {
  gulp.src(['public/css/*.less']).pipe(less()).pipe(gulp.dest('public/css'))
})

gulp.task('watch', function () {
  gulp.watch('public/css/*.less', ['less']) // 当所有less文件发生改变时，调用less任务
})

gulp.task('default', ['less'], function () {
  console.log('构建完成')
})
