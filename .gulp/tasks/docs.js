const gulp = require('gulp')
const g = require('gulp-load-plugins')({lazy: true})
const path = require('path')
const fs = require('fs-then-native')
const jsdoc2md = require('jsdoc-to-markdown')

const settings = require('./settings').settings
const allSettings = require('./settings').allSettings

gulp.task('docs-api', () => {
  return fs.readFile(path.join(settings('$.templates.basepath'), settings('$.templates.files.API')), 'utf8')
    .then(content => jsdoc2md.render({
      template: content,
      files: path.join(settings('$.sources.path'), settings('$.sources.pattern')),
      'example-lang': 'js',
      'heading-depth': 3,
      partial: path.join(settings('$.templates.partials.basepath'), settings('$.templates.partials.pattern')),
      helper: '.gulp/tasks/settings.js'
    }))
    .then(output => fs.writeFile('./docs/API.md', output))
})

gulp.task('docs-readme', () => {
  return gulp.src(path.join(settings('$.templates.basepath'), settings('$.templates.files.README')))
    .pipe(g.mustachePlus(allSettings, {}, {
      usage: path.join(settings('$.templates.basepath'), settings('$.templates.files.USAGE')),
      credits: path.join(settings('$.templates.basepath'), settings('$.templates.files.CREDITS'))
    }))
    .pipe(g.rename('README.md'))
    .pipe(gulp.dest('./'))
})

gulp.task('docs', ['docs-api', 'docs-readme'])
