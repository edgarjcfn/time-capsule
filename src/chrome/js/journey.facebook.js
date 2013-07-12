var services = angular.module('journey.services');

services.service('facebook', function() {
	var facebook = {};

	facebook.getLastYearsPosts = function (token, callback)
	{
		var oauth_token = token;
		var graphAPI = "https://graph.facebook.com/me?access_token=" + oauth_token;

		// Thank you, datejs :)
		var minDate = Date.parse('1 year ago').add(-10).days().getTime() / 1000;
		var maxDate = Date.parse('1 year ago').add(10).days().getTime() / 1000;

		var userFields = [
		'id',
		'name'
		]

		var imageFields = [
		'created_time',
		'height',
		'width',
		'name',
		'picture',
		'source',
		'link'
		];

		var statusFields = [
		'message'
		];

		$.ajax({
			dataType: "json",
			url: graphAPI,
			data: {
			'fields' :  userFields.join() + ',' +
			          'photos.since('+minDate+').until('+maxDate+').fields('+imageFields.join()+'),' + 
			          'statuses.since('+minDate+').until('+maxDate+').fields('+statusFields.join()+')'
			},
			success : function(response) {
				callback(response);
			}
		});
	};
	

	return facebook;
});