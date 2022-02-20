module.exports = {
  copyProd: {
    src: [
      './src/assets/**/*'
    ],
    dest: './dist/'
  },
  lessInject: {
    srcIndex: './dist/index.html',
    srcCss: './dist/base*.css'
  },

  svg: {
    src: './src/assets/themes/base/images/icons/*.svg',
    dest: './dist/src/assets'
  },

  less: {
    componentsProd: {
      src: [
        './src/assets/**/*.less'
      ],
      dest: './dist/'
    }
  },

  css: {
    components: {
      src: "./dist/**/*.css" ,
      dest: './dist/assets'
    }
  },

  // Plugins config
  plugins: {
    scope: ['dependencies', 'devDependencies', 'peerDependencies'],
    rename: {
      'gulp-autoprefixer': 'autoprefixer',
      'gulp-concat': 'concat',
      'gulp-ignore': 'ignore',
      'gulp-less': 'less',
      'gulp-plumber': 'plumber',
      'gulp-rename': 'rename',
      'gulp-rimraf': 'rimraf',
      'gulp-sequence': 'sequence',
      'gulp-sourcemaps': 'sourcemaps',
      'gulp-clean-css': "cleancss",
      'gulp-base64': 'base64'
    }
  }
};
