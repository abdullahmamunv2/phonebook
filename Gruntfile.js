const path = require('path');
module.exports = function(grunt) {
  
    grunt.initConfig({
        copy: {
            development: {
              files: [
                  {
                    src : [
                        "public"
                    ],
                    dest : 'dist/development/',
                    expand : false
                  },
                {
                    src: [
                        'token-secret/dev/public.key',
                        'token-secret/dev/private.key'
                    ], 
                    dest: 'dist/development/token-secret',
                    expand: true,
                    flatten: true
                },
                {
                    src: [
                        'config/default.json',
                        'config/custom-environment-variables.json',
                        'config/development.json'
                    ], 
                    dest: 'dist/development/',
                    expand: true
                },
                {
                    src: [
                        'package.json',
                        'module.alias.config.js',
                        'docker/dev/DockerFile',
                        'log4js-config/dev/log4js.json',
                        'env/dev/.env'
                    ], 
                    dest: 'dist/development/',
                    expand: true,
                    flatten: true
                },
              ],
            },
            staging: {
                files: [
                    {
                        src : [
                            "public"
                        ],
                        dest : 'dist/staging/',
                        expand : false
                      },
                  {
                      src: [
                          'config/default.json',
                          'config/custom-environment-variables.json',
                          'config/staging.json'
                      ], 
                      dest: 'dist/staging/',
                      expand: true
                  },
                  {
                      src: [
                          'package.json',
                          'module.alias.config.js',
                          'docker/stage/DockerFile',
                          'log4js-config/stage/log4js.json',
                          'pm2-config/stage/pm2.config.json',
                          'env/stage/.env'
                      ], 
                      dest: 'dist/staging/',
                      expand: true,
                      flatten: true
                  },
                ],
            },
            production: {
                files: [
                    {
                        src : [
                            "public"
                        ],
                        dest : 'dist/production/',
                        expand : false
                      },
                  {
                      src: [
                          'config/default.json',
                          'config/custom-environment-variables.json',
                          'config/production.json'
                      ], 
                      dest: 'dist/production/',
                      expand: true
                  },
                  {
                      src: [
                          'package.json',
                          'module.alias.config.js',
                          'docker/prod/DockerFile',
                          'log4js-config/prod/log4js.json',
                          'pm2-config/prod/pm2.config.json',
                          'env/prod/.env'
                      ], 
                      dest: 'dist/production/',
                      expand: true,
                      flatten: true
                  },
                ],
            },
          }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('dev', ["copy:development"]);
    grunt.registerTask('stage', ["copy:staging"]);
    grunt.registerTask('prod', ["copy:production"]);
  };