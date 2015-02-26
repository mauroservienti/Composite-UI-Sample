/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: 'wwwroot/lib',
                    layout: 'byComponent',
                    cleanTargetDir: false
                }
            }
        },
        uglify: {
            options: {
                compress: {
                    global_defs: {
                        "DEBUG": true
                    },
                    dead_code: false,
                    unused: false,
                    warnings: true
                }
            },
            my_target: {
                files: { 'wwwroot/app.js': ['app/app.js', 'app/**/*.js'] }
            }
        },

        watch: {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['uglify']
            }
        }
    });

    grunt.registerTask('default', ['bower:install', 'uglify', 'watch']);

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};