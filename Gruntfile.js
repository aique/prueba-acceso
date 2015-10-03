module.exports = function(grunt)
{
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON('package.json'),
        uglify:
        {
            vendor:
            {
                src: 'public/vendor/*.js',
                dest: 'public/js/build/vendor.min.js'
            },
            src:
            {
                src: 'public/js/**/*.js',
                dest: 'public/js/build/all.min.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};