"use strict";

const
  config   = require("./config/gulpconfig"),
  gulp     = require("gulp"),
  inject   = require("gulp-inject"),
  rev      = require("gulp-rev"),
  plugins  = require("gulp-load-plugins")(config.plugins);

gulp.task("less", () =>
  gulp.src(config.css.components.src)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.css.components.dest))
);

gulp.task("less:inject", () => {
  let target = gulp.src(config.lessInject.srcIndex),
    src = gulp.src(config.lessInject.srcCss, {read: false});

  function fileContents(filePath, file) {
    return `<link id="uxCurrentLinkStylesheetID" rel="stylesheet" href="./${filePath.split("/dist/")[1]}">`;
  }

  return target
    .pipe(inject(src, {transform: fileContents}), {relative: false})
    .pipe(gulp.dest("dist"));
});


/*HELPERS*/
process.on("uncaughtException", (err) => {
  console.error(err.message, err.stack, err.errors);
  process.exit(255);
});

gulp.on("err", (gulpErr) => {
  if(gulpErr.err) {
    console.error("Gulp error details", [gulpErr.err.message, gulpErr.err.stack, gulpErr.err.errors].filter(Boolean));
  }
});

/*Copy*/
gulp.task("less:copy", () => {
  return gulp.src(config.copyProd.src, { base: "./" })
    .pipe(plugins.plumber({
      errorHandler: onPlumberError
    }))
    .pipe(gulp.dest(config.copyProd.dest))
});

gulp.task("copy:prod", gulp.series("less:copy"), () => {
  return true;
});

function onPlumberError(error) {
  console.log(error, " plumber error");
  this.emit("end");
  process.exit(255);
}

gulp.task("less:components:prod", () => {

  return gulp.src(config.less.componentsProd.src)
    .pipe(plugins.plumber({
      errorHandler: onPlumberError
    }))
    .pipe(plugins.less())
    .pipe(gulp.dest(config.svg.dest));

});
// General tasks
gulp.task("prod", gulp.series("less:components:prod", "copy:prod"));

