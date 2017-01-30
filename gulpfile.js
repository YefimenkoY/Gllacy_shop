'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    spritesmith = require('gulp.spritesmith'),
    plumber = require('gulp-plumber');

var path = {
    build: { 
        html: './',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/js/**/*.js',
        style: 'src/styles/main.scss',
        img: 'src/img/**/*.*', 
        fonts: 'src/fonts/**/*.*'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/styles/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/img/sprites/*.png')
        .pipe(spritesmith({
            /* this whole image path is used in css background declarations */
            imgName: '../img/sprite.png',
            cssName: '_sprite.scss'
        }));
    spriteData.img.pipe(gulp.dest('./src/img'));
    spriteData.css.pipe(gulp.dest('./src/styles/_misc/'));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(plumber())
        .pipe(rigger())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js)) 
        .pipe(reload({stream: true})); 
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(plumber())
        .pipe(sourcemaps.init()) 
        .pipe(sass())
        .pipe(prefixer()) 
        .pipe(cssmin()) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) 
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) 
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function() {
        gulp.start('html:build');
    });
    watch([path.watch.style], function() {
        gulp.start('style:build');
    });
    watch([path.watch.js], function() {
        gulp.start('js:build');
    });
    watch([path.watch.img], function() {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function() {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);

