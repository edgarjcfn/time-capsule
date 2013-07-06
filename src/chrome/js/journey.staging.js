var journey = angular.module('journey', []);

journey.filter('daysLeft', function() {
    return function(date)
    {
        var diff = (date - Date.today().getTime());
        var oneday = 24*60*60*1000;
        return diff / oneday;
    }
});

journey.service('oauth', function() {
    this.connectUrl = "http://stunning-net-216.appspot.com/auth/{service}/login"
    this.successUrl = "http://stunning-net-216.appspot.com/auth/{service}/success"
});