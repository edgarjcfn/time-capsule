var services = angular.module('journey.services', []);
var filters = angular.module('journey.filters', []);

var journey = angular.module('journey', 
    ['journey.services', 
    'journey.filters']);


journey.service('config', function() {
	this.OauthConnectUrl = "http://my-time-capsule.appspot.com/auth/{service}/login";
	this.OauthSuccessUrl = "http://my-time-capsule.appspot.com/auth/{service}/success";
    // this.oauthSuccessUrl = function(service) {
    // 	return "http://my-time-capsule.appspot.com/auth/{service}/success".replace('{service}', service);
    // }
});