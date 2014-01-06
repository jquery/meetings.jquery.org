module.exports = function( grunt ) {
"use strict";

grunt.loadNpmTasks( "grunt-clean" );
grunt.loadNpmTasks( "grunt-html" );
grunt.loadNpmTasks( "grunt-wordpress" );
grunt.loadNpmTasks( "grunt-jquery-content" );
grunt.loadNpmTasks( "grunt-check-modules" );

grunt.initConfig({
	clean: {
		folder: "dist/"
	},
	htmllint: {
		resources: "resources/*.html",
		page: "pages/*.html"
	},
	jshint: {
		options: {
			undef: true,
			node: true
		}
	},
	lint: {
		grunt: "grunt.js"
	},
	watch: {
		pages: {
			files: "pages/**",
			tasks: "deploy"
		}
	},
	"build-minutes": {
		all: grunt.file.expandFiles( "minutes/**" )
	},
	"build-pages": {
		all: grunt.file.expandFiles( "pages/**" )
	},
	"build-resources": {
		all: grunt.file.expandFiles( "resources/**" )
	},
	wordpress: grunt.utils._.extend({
		dir: "dist/wordpress"
	}, grunt.file.readJSON( "config.json" ) )
});

grunt.registerTask( "build-categories", function() {
	grunt.file.copy( "taxonomies.json", grunt.config( "wordpress.dir" ) + "/taxonomies.json" );
});

grunt.registerMultiTask( "build-minutes", "Process html and markdown files as meeting minutes, into wp posts", function() {
	var content,
		task = this,
		taskDone = task.async(),
		files = this.data,
		targetDir = grunt.config( "wordpress.dir" ) + "/posts/post/",
		taxonomies = grunt.file.readJSON( "taxonomies.json" ),
		teamNames = {};

	taxonomies.category.forEach(function( category ) {
		teamNames[ category.slug ] = "jQuery " + category.name;
	});

	grunt.file.mkdir( targetDir );

	grunt.utils.async.forEachSeries( files, function( fileName, fileDone ) {
		var content,
			post = grunt.helper( "wordpress-parse-post-flex", fileName ),
			fileType = /\.(\w+)$/.exec( fileName )[ 1 ],
			categorySlug = fileName.replace( /^.+?.+\/(.+)\/(.+)\.\w+$/, "$1" ),
			postDateSlug = fileName.replace( /^.+?.+\/(.+)\/(.+)\.\w+$/, "$2" ),
			postHourUTC = { core: 18, ui: 18, events: 19, infrastructure: 20, testing: 17, content: 19, mobile: 20 },
			// Most meetings happen in the middle of the day, not the middle of the night
			// Adding 12hrs fixes off-by-one error after time zone adjusts from GMT to local
			postDate = new Date( postDateSlug + "T" + postHourUTC[ categorySlug ] + ":00" ),
			// Slice off the "DAY " from the date string
			postDateString = postDate.toDateString().slice( 4 ),
			targetFileName = targetDir + postDateSlug + "-" + categorySlug + ".html",
			teamName = teamNames[ categorySlug ];

		grunt.verbose.write( "Processing " + fileName + "..." );

		function processPost() {
			content = post.content;
			delete post.content;

			// Convert markdown to HTML
			if ( fileType === "md" ) {
				content = grunt.helper( "parse-markdown", content, {} );
				delete post.toc;
			}

			post.title = teamName + " Meeting - " + postDateString;
			post.date = postDate;
			post.termSlugs = { "category": [ categorySlug ] };

			post.customFields = post.customFields || [];
			post.customFields.push({
				key: "source_path",
				value: fileName
			});

			// Write file
			grunt.file.write( targetFileName,
				"<script>" + JSON.stringify( post ) + "</script>\n" + content );

			fileDone();
		}

		// Invoke the pre-processor for custom functionality
		// TODO: see if we should create a "build-posts-preprocess"
		grunt.helper( "build-pages-preprocess", post, fileName, processPost );
	}, function() {
		if ( task.errorCount ) {
			grunt.warn( "Task \"" + task.name + "\" failed." );
			taskDone();
			return;
		}
		grunt.log.writeln( "Built " + files.length + " pages." );
		taskDone();
	});
});

grunt.registerTask( "default", "lint" );
grunt.registerTask( "build-wordpress", "check-modules clean lint build-pages build-categories build-minutes build-resources" );

};
