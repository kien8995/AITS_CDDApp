const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const GulpSSH = require('gulp-ssh');
// const fs = require('fs');
// const { exec } = require('child_process');

// gulp.task('package-bundle', () => {
//   const json = JSON.parse(fs.readFileSync('./package.json'));
//   const packages = Object.entries(json.dependencies);
//   const devPackages = Object.entries(json.devDependencies);
//   return new Promise((resolve, reject) => {
//     exec(`npm-bundle ${packages[0][0]}@${packages[0][1]}`);
//     resolve();
//   });
// });

gulp.task('deploy', () => {
  const sshConfig = {
    host: '10.1.7.93',
    port: 22,
    username: 'administrator',
    password: 'Gppm@its',
    // privateKey: fs.readFileSync('/Users/zensh/.ssh/id_rsa')
  };

  const gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig,
  });

  return gulp.src(['./build/**']).pipe(gulpSSH.dest('C:\\MISAPP\\frontend'));
});

// Task to minify css using package cleanCSs
gulp.task('styles', () =>
  gulp
    .src('./build/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build')),
);

// Gulp task to minify JavaScript files
gulp.task('scripts', () =>
  gulp
    .src('./build/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build')),
);

// Gulp task to minify HTML files
gulp.task('pages', () =>
  gulp
    .src('./build/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      }),
    )
    .pipe(gulp.dest('./build')),
);

gulp.task('replaces', () =>
  gulp
    .src('./build/*.js')
    .pipe(replace('ant', 'aits'))
    .pipe(gulp.dest('./build')),
);

// Gulp task to minify all files
gulp.task('optimization', gulp.series(['styles', 'scripts', 'pages']));
