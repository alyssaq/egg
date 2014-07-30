'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    autoprefixer: {
      files: {
        src: 'styles/site.css',
        dest: 'styles/site.min.css'
      }
    },
    cssmin: {
      minify: {
        src: 'styles/site.min.css',
        dest: 'styles/site.min.css'
      }
    },
    uglify: {
      minify: {
        files: {
          'scripts/main.min.js': ['scripts/*.js', '!scripts/*.min.js']
        }
      }
    }
  });

  grunt.registerTask('default', [
    'autoprefixer',
    'cssmin',
    'uglify']);
};