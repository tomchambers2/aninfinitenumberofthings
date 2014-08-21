module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		wiredep: {
			target: {
				src: [
					'app/index.html',
					'app/styles/main.scss'
				]
			}
		},
		watch: {
			html: {
				files: ['app/*.html'],
				options: {
					livereload: true
				}
			},
			scripts: {
				files: ['app/scripts/*.js'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['app/styles/*.css'],
				options: {
					livereload: true
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'app/',
					keepalive: true
				}
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'app/styles/main.css': 'app/styles/main.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.event.on('watch', function(action,filepath,target) {
		grunt.log.writeln(target + ': '+filepath+' has '+action);
	});

	grunt.registerTask('serve', ['watch','connect'])
}