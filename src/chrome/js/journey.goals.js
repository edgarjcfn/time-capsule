function GoalsController($scope)
{
    $scope.loaded = false;
    $scope.newGoal = null;
    $scope.newGoalExample = null;
    $scope.db = {};

    $scope.load = function()
    {
        chrome.storage.sync.get('goals', function(data)
            {
                $scope.newGoalExample = $scope.randomGoal();
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
        $scope.newGoalExample = $scope.randomGoal();
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

    $scope.randomGoal = function() {
        
        var goals = [
            'Achieve ideal weight',
            'Travel to Asia',
            'Support a charity',
            'Hug a tree',
            'Get the band back together',
            'Learn to cook',
            'Learn a new language',
            'Travel overseas',
            'Finish writing my novel',
            'Develop that app idea',
            'Take a public-speaking seminar',
            'Go fishing with my dad',
        ];

        var index = getRandomInt(0, goals.length);
        return goals[index];
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


