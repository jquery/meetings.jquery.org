var agendas = {
		core: "https://docs.google.com/document/d/1su2ZTFZbnp_DD-LGZleuEudTFRJT_g4zf7UfGOMQvco",
		chassis: "https://docs.google.com/spreadsheets/d/1FUdRcAq2d8njs8KAcfQmEyoZL74SXLsLp1rtc7E9z_I",
		infrastructure: "https://docs.google.com/document/d/1JUfGj8dQH3Q4JoBOlNnfDFrESzMt6LhktXsmtPYocXI",
		ui: "https://docs.google.com/spreadsheets/d/1E4ieJTELlFeUo9ycooPTqWv0gtIt-44T-47Y2F_100U",
		testing: "https://docs.google.com/document/d/13FbWhiFQ9gWQvB1Tm4QM_OC4me-ha2ujDWH5sdF7ueo"
	},
	taxonomies = {
		"category": [
			{
				"name": "Core Team",
				"slug": "core",
				"description": "Minutes from jQuery Core Team meetings"
			},
			{
				"name": "Mobile Team",
				"slug": "mobile",
				"description": "Minutes from jQuery Mobile Team meetings"
			},
			{
				"name": "Testing Team",
				"slug": "testing",
				"description": "Minutes from jQuery Testing Team meetings"
			},
			{
				"name": "UI Team",
				"slug": "ui",
				"description": "Minutes from jQuery UI Team meetings"
			},
			{
				"name": "Ecma/TC39",
				"slug": "tc39",
				"description": "Minutes from Ecma/TC39 meetings, recorded by jQuery representatives"
			}
		]
	};

taxonomies.category.forEach(function( category ) {
	var agenda = agendas[ category.slug ];
	if ( agenda ) {
		category.description += "<br><a href=\"" + agenda + "\">View meeting agenda</a>";
	}
});

module.exports = taxonomies;
