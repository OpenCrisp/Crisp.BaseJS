'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		clean: {
			files: ['dist']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: [
					['src/<%= pkg.name %>.js','src/control.js','src/global-*.js']
				],
				dest: 'dist/<%= pkg.name %>.js'
			},
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				compress: {
					drop_console: true
				}
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/<%= pkg.name %>.min.js'
			},
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: ['src/**/*.js']
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/**/*.js']
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src', 'qunit']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit']
			},
		},
		qunit: {
			files: ['test_qunit/**/*.html']
		},
		nodeunit: {
			all: ['test_nodeunit/**/*.js']
		},
		jsdoc : {
			dist : {
				src: ['src/**/*.js', 'README.md'],
				// src: ['src/<%= pkg.name %>.js', 'test/**/*_test.js'],
				options: {
					destination: 'doc',
					// template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
					// configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
				}
			}
		},
		jsdoc2md: {
            oneOutputFile: {
                src: ["src/**/*.js", 'test/**/*_test.js', 'README.md'],
				// src: ['src/<%= pkg.name %>.js', 'test/**/*.js', 'README.md'],
				// src: ['INSTALL.md', 'src/<%= pkg.name %>.js', 'test/**/*_test.js', 'README.md'],
                dest: "DOC.md"
            }
        }
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks("grunt-jsdoc-to-markdown");

	// Default task.
	grunt.registerTask('default', ['jshint', 'qunit', 'nodeunit', 'clean', 'concat', 'uglify']);
	grunt.registerTask('test', ['jshint', 'qunit', 'nodeunit']);

};