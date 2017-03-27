var gulp = require("gulp"),
    less = require("gulp-less"),
    browserSync = require("browser-sync"),
    cssnano = require("gulp-cssnano"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglifyjs"),
    rename = require("gulp-rename"),
    autoprefixer = require("gulp-autoprefixer"),
    plumber = require("gulp-plumber"),
    gutil = require("gulp-util");

gulp.task("less", function() {
  return gulp.src("less/style.less")
  .pipe(plumber(function (error) {
    gutil.log(error.message);
    this.emit('end');
}))
  .pipe(less())
  .pipe(autoprefixer(["last 10 versions", "> 1%", "ie 8", "ie 7"], {cascade: true}))
  .pipe(gulp.dest("css"))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task("cssmin", ["less"], function() {
  gulp.src("css/style.css")
  .pipe(cssnano())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("css"))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "../project"
    },
    notify: false
  });
});

gulp.task("watch", ["browser-sync", "cssmin"], function() {
  gulp.watch("less/**/*.less", ["cssmin"]);
  gulp.watch("*.html", browserSync.reload);
  gulp.watch("js/**/*.js", browserSync.reload);
});

gulp.task("default", ["watch", "browser-sync", "cssmin", "less"]);