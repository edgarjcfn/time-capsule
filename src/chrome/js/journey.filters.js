var filters = angular.module('journey.filters');

filters.filter('daysLeft', function() {
    return function(date)
    {
    	if (typeof(date) == "string")
    	{
    		date = date.replace(/T/g, ' ');
    		date = date.substring(0,date.indexOf('+'));
    		date = Date.parse(date);
    	}

        var diff = Math.abs(date - Date.today().getTime());
        var oneday = 24*60*60*1000;
        return Math.floor(diff / oneday);
    }
});