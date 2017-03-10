module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/client/*.js'],
        dest: 'public/dist/build.js',
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      myTarget: {
        files: {
          'public/dist/build.js': ['public/dist/build.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'public/client', 'lib/', 'app/', 'server.js', 'server-config.js'
      ]
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['public/style.css'],
          dest: 'public/dist',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'eslint',
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('lint', ['eslint']);

  grunt.registerTask('build', [ 'concat', 'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  // grunt.registerTask('deploy', [
  //   // add your deploy tasks here
  //   'eslint', 'concat', 'uglify', 'cssmin', 'mochaTest', 'nodemon', 'watch'
  // ]);

  grunt.registerTask('deploy', function() {
    if (grunt.option('prod')) {
      grunt.task.run(['eslint', 'concat', 'uglify', 'cssmin', 'mochaTest', 'shell']);
    } else {
      grunt.task.run(['eslint', 'concat', 'uglify', 'cssmin', 'mochaTest', 'watch']);
    }
  });

  grunt.registerTask('deploy --prod', ['eslint']);

  grunt.registerTask('start', ['nodemon']);

  grunt.registerTask('push', ['shell']);

  grunt.registerTask('concat-file', ['concat']);

};
