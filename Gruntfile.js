'use strict';

module.exports = function(grunt) {
  var config = {
    dev: 'src',
    prod: 'app'
  };

  grunt.initConfig({
    config: config,
    clean: ['<%= config.prod %>'],
    autoprefixer: {
      files: {
        src: '<%= config.dev %>/styles/site.css',
        dest: '<%= config.prod %>/site.min.css'
      }
    },
    cssmin: {
      minify: {
        src: '<%= config.prod %>/site.min.css',
        dest: '<%= config.prod %>/site.min.css'
      }
    },
    uglify: {
      minify: {
        files: {
          '<%= config.prod %>/main.min.js': [
            '<%= config.dev %>/scripts/*.js',
            '<%= config.dev %>/!scripts/*.min.js']
        }
      }
    },
    processhtml: {
      prod: {
        files: {
          '<%= config.prod %>/index.html': ['<%= config.dev %>/index.html']
        }
      }
    },
    copy: {
      ico: {
        src: '<%= config.dev %>/favicon.ico',
        dest: '<%= config.prod %>/favicon.ico',
      },
      fonts: {
        expand: true, flatten: true,
        src: ['<%= config.dev %>/styles/fonts/*'],
        dest: '<%= config.prod %>/fonts',
        filter: 'isFile'
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'clean',
    'autoprefixer',
    'cssmin',
    'uglify',
    'copy',
    'processhtml']);
};