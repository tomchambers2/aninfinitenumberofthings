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
		},
		concat: {

		},
		'gh-pages': {
			options: {
				base: 'build'
			},
			src: ['**']
		},
		copy: {
			build: {
				cwd: 'app',
				src: ['**'],
				dest: 'build',
				expand: true
			}
		},
		autoprefixer: {
			build: {
				expand: true,
				cwd: 'build',
				src: ['**/*.css'],
				dest: 'build'
			}
		},
		useminPrepare: {
			html: 'build/index.html',
			options: {
				dest: 'build'
			}
		},
		cssmin: {
			generated: {
				files: {
					'build/application.css': ['app/styles/*.css']
				}
			}
		},
		uglify: {
			generated: {
				options: {
					mangle: false
				},
				files: {
					'build/application.js': ['app/scripts/*.js']
				}
			}
		},
		usemin: {
			html: 'build/index.html'
		},
		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: 'app/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: 'build/images'
				}]
			}
		},
		clean: {
			build: {
				src: ['build/']
			},
			stylesheets: {
				src: ['build/styles/*.css', '!build/styles/application.css']
			},
			scripts: {
				src: ['build/scripts/*.js', '!build/scripts/application.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.event.on('watch', function(action,filepath,target) {
		grunt.log.writeln(target + ': '+filepath+' has '+action);
	});

	grunt.registerTask('serve', ['watch','connect']);
	grunt.registerTask('build', ['clean:build','sass','copy','autoprefixer','useminPrepare','concat','cssmin','uglify','usemin','imagemin','clean:stylesheets','clean:scripts','gh-pages']);
}