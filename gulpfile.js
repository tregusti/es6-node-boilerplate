"use strict";

require("babel-core/register");

let babel = require('gulp-babel');
let gulp = require('gulp');
let mocha = require('gulp-mocha');
let sourcemaps = require("gulp-sourcemaps");

const SOURCE_FILES = "./src/*.js";
const TEST_FILES = "./specs/*.js";

gulp.task("babel", () => {
    return gulp.src(SOURCE_FILES)
        .pipe(sourcemaps.init())
        .pipe(babel())
        // .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));
});

gulp.task('test', function() {
    return gulp.src(TEST_FILES, { read: false })
        .pipe(mocha({
            reporter: 'dot'
        }));
});

gulp.task('watch', function() {
    // Can't use gulp-watch mainly due to
    // https://github.com/floatdrop/gulp-watch/issues/194.
    return gulp.watch([TEST_FILES, SOURCE_FILES], ['test']);
});
