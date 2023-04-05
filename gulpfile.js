import gulp from 'gulp';
import deploy from 'gulp-gh-pages';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import clean from 'gulp-clean';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const BS = browserSync.create();

const styles = () => gulp.src('./src/scss/main.scss')
.pipe(sass().on('error', sass.logError))
.pipe(cleanCSS({compatibility: 'ie8'}))
.pipe(autoprefixer({
    cascade: true
}))
.pipe(concat('style.min.css'))
.pipe(gulp.dest('./dist/'));


const scripts = () => gulp.src('./src/js/*.js')
.pipe(concat('scripts.min.js'))
.pipe(uglify())
.pipe(gulp.dest('./dist/'));

const del = () => gulp.src('./dist')
    .pipe(clean({force: true}))
    .pipe(gulp.dest('./'));

            

const imageMin = () => gulp.src('src/img/**/*')
.pipe(imagemin())
.pipe(gulp.dest('dist/img'));


export const build = gulp.series(del, gulp.parallel(scripts, styles, imageMin));


const buildDev = gulp.parallel(scripts, styles);


export const dev = () => {
    BS.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['./src/**/*', './index.html'], gulp.series(buildDev, (done) => {
        BS.reload()
        done()
    }))
}
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(deploy());
});
