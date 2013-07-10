var services = angular.module('journey.services');

services.service('twitter', function() {
	var twitter = {};

	twitter.getLastYearsPosts = function (token, callback)
	{
		var url = 'https://api.twitter.com/1.1/search/tweets.json';
		
		$.ajax({
			dataType: "json",
			url: graphAPI,
			data: {
			'q' :  '@edgarjcfn',
			'until' : '2012-07-03',
			'token' : token
			},
			success : function(response) {
				callback(response);
			}
		});

		callback("success");
	};

	return twitter;
} );
