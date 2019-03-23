const glob = require('glob');

const getPrettierFiles = () => {
  let files = [];
  const jsFiles = glob.sync('app/**/*.js*', {
    ignore: ['**/node_modules/**', 'build/**'],
  });
  const tsFiles = glob.sync('app/**/*.ts*', {
    ignore: ['**/node_modules/**', 'build/**'],
  });
  const configFiles = glob.sync('config/**/*.js*', {
    ignore: ['**/node_modules/**', 'build/**'],
  });
  const scriptFiles = glob.sync('scripts/**/*.js');
  const cssFiles = glob.sync('app/**/*.css*', {
    ignore: ['**/node_modules/**', 'build/**'],
  });
  const sassFiles = glob.sync('app/**/*.scss*', {
    ignore: ['**/node_modules/**', 'build/**'],
  });
  const lessFiles = glob.sync('app/**/*.less*', {
    ignore: ['**/node_modules/**', 'build/**'],
  });
  files = files.concat(jsFiles);
  files = files.concat(tsFiles);
  files = files.concat(configFiles);
  files = files.concat(scriptFiles);
  files = files.concat(cssFiles);
  files = files.concat(sassFiles);
  files = files.concat(lessFiles);
  if (!files.length) {
    return;
  }
  return files;
};

module.exports = getPrettierFiles;
