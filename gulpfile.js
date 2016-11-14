var gulp = require('gulp');
var tsc  = require("gulp-typescript");
var del = require('del');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var spawn = require('child_process').spawn;
var node;
 
var tsProject = tsc.createProject("tsconfig.json");
 
gulp.task('clean', function(cb){
    return del('dist', cb)    
})
 
gulp.task('build', ['clean'], function() {
    var tsResult = gulp.src(["typings/index.d.ts","src/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write('.', {
           sourceRoot: function(file){ return file.cwd + '/src'; }
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task('server', ['build'], function() {
  if (node) node.kill()
  node = spawn('node', ['dist/server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

gulp.task('watch', ['server'], function() {
	gulp.watch('src/**/*.ts', ['server']);
});

gulp.task('default', ['watch']);

process.on('exit', function() {
    if (node) node.kill()
})
