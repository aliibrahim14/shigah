var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify');

// html task
gulp.task('html', function(){
    return gulp.src('stage/html/*.pug')                                    //any pug file choose it
    .pipe(pug({                                                            //the output type is pretty
        pretty: true
    }))
    .pipe(gulp.dest('dist'))                                               //the location of the output file
    .pipe(livereload())                                                   //the reloading
});

//css task
gulp.task('css', function(){
    return gulp.src(['stage/css/**/*.css', 'stage/css/**/*.scss'])    //any css and scss file choose it
    .pipe(sourcemaps.init())                                         //the sourcemaps
    .pipe(sass({                                                    //the output type is compressed
        outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer())                                          //the autoprefixer for css3
    .pipe(concat('main.css'))                                     //the output file
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))                                 //the location of the output file
    .pipe(livereload())                                         //the reloading
});

//js task
gulp.task('js', function() {
    return gulp.src('stage/js/*.js')
    .pipe(concat('main.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
});

//watch task
gulp.task('watch', function(){
    require('./server.js');
    livereload.listen();
    gulp.watch("stage/html/**/*.pug", ['html']);
    gulp.watch(["stage/css/**/*.css", "stage/css/**/*.scss"], ['css']);
    gulp.watch("stage/js/*.js", ['js']);
})