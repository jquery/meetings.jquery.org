var agendas = {
		core: "https://docs.google.com/document/d/1BadwSO6Sn91RBfr05s77r81ncEi0oMBJ5mZS-k215vg",
		chassis: "https://docs.google.com/spreadsheets/d/1FUdRcAq2d8njs8KAcfQmEyoZL74SXLsLp1rtc7E9z_I",
		infrastructure: "https://docs.google.com/document/d/1JUfGj8dQH3Q4JoBOlNnfDFrESzMt6LhktXsmtPYocXI",
		ui: "https://docs.google.com/spreadsheets/d/1E4ieJTELlFeUo9ycooPTqWv0gtIt-44T-47Y2F_100U",
		testing: "https://docs.google.com/document/d/13FbWhiFQ9gWQvB1Tm4QM_OC4me-ha2ujDWH5sdF7ueo",
		mobile: "https://docs.google.com/spreadsheets/d/1xGEVtftLDEHAA37YYlA23J_EZwIRyMUaseBY790byPM/",
		content: "https://docs.google.com/spreadsheets/d/1pJhQj3Nn-5rdmqocN9NKP8CpnC4Z42TRAvNC3SJLj3o/"
	},
	taxonomies = {
		"category": [
			{
				"name": "Chassis Team",
				"slug": "chassis",
				"description": "Minutes from Chassis Team meetings"
			},
			{
				"name": "Content Team",
				"slug": "content",
				"description": "Minutes from jQuery Content Team meetings"
			},
			{
				"name": "Core Team",
				"slug": "core",
				"description": "Minutes from jQuery Core Team meetings"
			},
			{
				"name": "Ecma/TC39",
				"slug": "tc39",
				"description": "Minutes from Ecma/TC39 meetings, recorded by jQuery representatives"
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
