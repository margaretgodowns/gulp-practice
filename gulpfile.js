'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del')

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat("app.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
    return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task("compileSass", function() {
    gulp.src("scss/application.scss")
    .pipe(maps.init())
    .pipe(sass())
    //add current working directory relative to the gulp.dest(css) directory
    .pipe(maps.write("./"))
    .pipe(gulp.dest("css"));
});

gulp.task("watchSass", function() {
    gulp.watch("scss/**/*.scss", ["compileSass"]);
})

gulp.task("clean", function() {
    del(["dist", "css/application.css*", "app*.js*"]);
})

//base preserves directory structure
gulp.task("build", ["minifyScripts", "compileSass"], function() {
    return gulp.src(["css/application.css", "js/app.min.js", "index.html", "img/**", "fonts/**"], {base: "./"})
    .pipe(gulp.dest("dist"));
});

gulp.task("default", ["clean"], function() {
    gulp.start("build");
});