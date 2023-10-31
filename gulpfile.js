const gulp = require('gulp')
const {series, parallel} = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')(require('node-sass'))
const browserSync = require('browser-sync').create()
const reload = browserSync.reload



function tarefasSass(cb) {
    gulp.src('./src/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
    return cb()
}


function tarefasCSS() {
    return gulp.src(
            [
                './src/css/**.css'
            ])
        .pipe(concat('libs.css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'))
}

function tarefaBootstrap(){
    return gulp.src('./node_modules/bootstrap/**')
            .pipe(gulp.dest('./bootstrap'))
}

// POC -- Proof of Concept

function tarefasHTML(callback) {
    gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./dist'))
    return callback()
}

function tarefasIcones() {
    return gulp.src('./src/assets/**')
        .pipe(gulp.dest('./dist/assets'))
}

function tarefasImg() {
    return gulp.src('./src/img/**')
        .pipe(gulp.dest('./dist/img'))
}


gulp.task('serv', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
    gulp.watch('./src/**/*').on('change', process)
    gulp.watch('./src/**/*').on('change', reload)

})


function end(cb) {
    console.log('Fim da operação')
    return cb()
}


const process = series(tarefaBootstrap, tarefasSass, tarefasCSS, tarefasHTML, end)

exports.bootstrap = tarefaBootstrap

exports.sass = tarefasSass

exports.styles = tarefasCSS

exports.arquivos = tarefasHTML

exports.icones = tarefasIcones

exports.img = tarefasImg


exports.default = process