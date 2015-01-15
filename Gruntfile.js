var jqueryContent = require( "grunt-jquery-content" ),
	taxonomies = require( "./taxonomies" );

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
	grunt.file.write(
		grunt.config( "wordpress.dir" ) + "/taxonomies.json",
		JSON.stringify( taxonomies )
	);
});

jqueryContent.postPreprocessors.post = (function() {
	var teamNames = {};

	taxonomies.category.forEach(function( category ) {
		teamNames[ category.slug ] = "jQuery " + category.name;
	});

	return function( post, postPath, callback ) {
		var categorySlug = postPath.replace( /^.+?.+\/(.+)\/(.+)\.\w+$/, "$1" ),
			postDateSlug = postPath.replace( /^.+?.+\/(.+)\/(.+)\.\w+$/, "$2" ),
			postDate = new Date( postDateSlug + " 12:00:00"),

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
