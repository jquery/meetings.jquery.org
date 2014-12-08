var jqueryContent = require( "grunt-jquery-content" );

module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-jquery-content" );

grunt.initConfig({
	"build-posts": {
		post: "minutes/**",
		page: "pages/**"
	},
	"build-resources": {
		all: "resources/**"
	},
	wordpress: (function() {
		var config = require( "./config" );
		config.dir = "dist/wordpress";
		return config;
	})()
});

grunt.registerTask( "build-categories", function() {
	grunt.file.copy( "taxonomies.json", grunt.config( "wordpress.dir" ) + "/taxonomies.json" );
});

jqueryContent.postPreprocessors.post = (function() {
	var taxonomies = grunt.file.readJSON( "taxonomies.json" ),
		teamNames = {},

		// Most meetings happen in the middle of the day, not the middle of the night
		// Adding 12hrs fixes off-by-one error after time zone adjusts from GMT to local
		postHourUTC = {
			content: 19,
			core: 18,
			events: 19,
			infrastructure: 20,
			mobile: 20,
			testing: 17,
			ui: 18
		};

	taxonomies.category.forEach(function( category ) {
		teamNames[ category.slug ] = "jQuery " + category.name;
	});

	return function( post, postPath, callback ) {
		var categorySlug = postPath.replace( /^.+?.+\/(.+)\/(.+)\.\w+$/, "$1" ),
			postDateSlug = postPath.replace( /^.+?.+\/(.+)\/(.+)\.\w+$/, "$2" ),
			postDate = new Date( postDateSlug + "T" + postHourUTC[ categorySlug ] + ":00" ),

			// Slice off the "DAY " from the date string
			postDateString = postDate.toDateString().slice( 4 ),
			teamName = teamNames[ categorySlug ];

		post.title = teamName + " Meeting - " + postDateString;
		post.date = postDate;
		post.termSlugs = { "category": [ categorySlug ] };
		post.fileName = postDateSlug + "-" + categorySlug + ".html";

		callback( null, post );
	};
})();

grunt.registerTask( "build", [ "build-posts", "build-categories", "build-resources" ] );

};
