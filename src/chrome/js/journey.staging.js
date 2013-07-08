var journey = angular.module('journey', []);

journey.filter('daysLeft', function() {
    return function(date)
    {
    	if (typeof(date) == "string")
    	{
    		date = date.replace(/T/g, ' ');
    		date = date.substring(0,date.indexOf('+'));
    		date = Date.parse(date);
    		console.debug(date);
    	}

        var diff = Math.abs(date - Date.today().getTime());
        var oneday = 24*60*60*1000;
        return Math.floor(diff / oneday);
    }
});

journey.service('oauth', function() {
    this.connectUrl = "http://stunning-net-216.appspot.com/auth/{service}/login"
    this.successUrl = "http://stunning-net-216.appspot.com/auth/{service}/success"
});