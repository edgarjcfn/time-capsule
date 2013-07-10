var services = angular.module('journey.services', []);
var filters = angular.module('journey.filters', []);

var journey = angular.module('journey', 
    ['journey.services', 
    'journey.filters']);


journey.service('oauth', function() {
    this.connectUrl = "http://stunning-net-216.appspot.com/auth/{service}/login"
    this.successUrl = "http://stunning-net-216.appspot.com/auth/{service}/success"
});