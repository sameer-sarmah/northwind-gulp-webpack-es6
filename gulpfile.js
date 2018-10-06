"use strict";

var gulp = require("gulp");
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');

gulp.task("webpack",function(){
    return webpackStream(webpackConfig,webpack)
    .pipe(gulp.dest('./dist/'));
});

gulp.task("default", ["webpack"]);
