var agendas = {
		chassis: "https://docs.google.com/spreadsheets/d/1FUdRcAq2d8njs8KAcfQmEyoZL74SXLsLp1rtc7E9z_I",
		content: "https://docs.google.com/document/d/10BtIFF5R_djDCAtwJQiIxy3oOxdQeyrogWFoSvybFHA",
		core: "https://docs.google.com/document/d/1BadwSO6Sn91RBfr05s77r81ncEi0oMBJ5mZS-k215vg",
		infrastructure: "https://docs.google.com/document/d/1JUfGj8dQH3Q4JoBOlNnfDFrESzMt6LhktXsmtPYocXI",
		mobile: "https://docs.google.com/spreadsheets/d/11-mngR57h54cIOjGDE2Z6LjaiyRgDwlcvKUzZn2Fw6M",
		pep: "https://docs.google.com/document/d/1nmk0W43PzkG5RNbJu9oEZv5f-5KWeJo5z22kza6q2AM",
		testing: "https://docs.google.com/document/d/13FbWhiFQ9gWQvB1Tm4QM_OC4me-ha2ujDWH5sdF7ueo",
		ui: "https://docs.google.com/spreadsheets/d/1E4ieJTELlFeUo9ycooPTqWv0gtIt-44T-47Y2F_100U"
	},
	taxonomies = {
		"category": [
			{
				"name": "Chassis Team",
				"slug": "chassis",
				"description": "Minutes from Chassis Team meetings"
			},
			{
				"name": "jQuery Content Team",
				"slug": "content",
				"description": "Minutes from jQuery Content Team meetings"
			},
			{
				"name": "jQuery Core Team",
				"slug": "core",
				"description": "Minutes from jQuery Core Team meetings"
			},
			{
				"name": "Ecma/TC39",
				"slug": "tc39",
				"description": "Minutes from Ecma/TC39 meetings, recorded by jQuery representatives"
			},
			{
				"name": "jQuery Mobile Team",
				"slug": "mobile",
				"description": "Minutes from jQuery Mobile Team meetings"
			},
			{
				"name": "PEP Team",
				"slug": "pep",
				"description": "Minutes from PEP Team meetings"
			},
			{
				"name": "Project Leads",
				"slug": "project-leads",
				"description": "Minutes from Project Leads meetings"
			},
			{
				"name": "Testing Team",
				"slug": "testing",
				"description": "Minutes from jQuery Testing Team meetings"
			},
			{
				"name": "jQuery UI Team",
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
