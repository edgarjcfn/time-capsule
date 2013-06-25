var journey = angular.module('journey', []);

journey.filter('daysLeft', function() {
    return function(date)
    {
        var diff = (date - Date.today().getTime());
        var oneday = 24*60*60*1000;
        return diff / oneday;
    }
});

journey.directive('otherName', function() {
    return function(scope, element)
    {
        console.log('test');
    };
});

function GoalsController($scope)
{
    $scope.loaded = false;
    $scope.newGoal = null;
    $scope.db = {'goals':[]};

    $scope.load = function()
    {
        chrome.storage.local.get('goals', function(data)
            {
                $scope.loaded = true;
                $scope.db = data;
                $scope.$apply();  
            });
    }

    $scope.addGoal = function()
    {
        $scope.db.goals.push(
            {
                description:$scope.newGoal, 
                deadline:Date.today().add(365).days().getTime()
            }
        );
        $scope.newGoal = null; 
        $scope.save();
    }

    $scope.save = function() {
        chrome.storage.local.set({'goals':$scope.db.goals});
    }

}


