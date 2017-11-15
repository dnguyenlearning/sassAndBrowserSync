const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat=require('gulp-concat');

//Compile sass
gulp.task('sass', ()=>{
    return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
});

//compile Js files
gulp.task('scripts', ()=>{
    return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
});


//Watch and Serve
gulp.task('serve',['scripts','sass'],()=>{
    browserSync.init({
        server: './src'
    })

    gulp.watch(['src/scss/*.scss'],['sass']);
    gulp.watch(['src/js/*.js'],['scripts']);
    gulp.watch(['src/*.html']).on('change', browserSync.reload);

})

//default
gulp.task('default', ['serve']);