function GoalsController($scope)
{
    $scope.loaded = false;
    $scope.newGoal = null;
    $scope.db = {};

    $scope.load = function()
    {
        chrome.storage.sync.get('goals', function(data)
            {
                $scope.loaded = true;
                if (! (data.goals))
                {
                    data.goals = [];
                }
                $scope.db = data;
                $scope.$apply();
            });
    }

    $scope.addGoal = function()
    {
        $scope.db.goals.splice(0, 0, 
            {
                description:$scope.newGoal, 
                deadline:Date.today().add(365).days().getTime(),
                done:false
            }
        );
        $scope.newGoal = null; 
        $scope.save();
    }

    $scope.remove = function(index)
    {
        if (confirm('Do you really want to remove this goal?'))
        {
            $scope.db.goals.splice(index, 1);
            $scope.save();
        }
    }

    $scope.save = function() {
        chrome.storage.sync.set({'goals':$scope.db.goals});
    }

    $scope.toggle = function(goal) {
        goal.done = !goal.done;
        $scope.sort();
        $scope.save();
    }

    $scope.sort = function(goal)
    {
        $scope.db.goals = _.sortBy($scope.db.goals, 'done');
    }

    $scope.checked = function(goal)
    {
        return goal.done ? "checked" : "";
    }

    $scope.is = function(test, caseTrue) {
        return test ? caseTrue : "";
    }
}


