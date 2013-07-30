function HeaderController($scope)
{
	$scope.themes = [
		'aqua',
		'blue',
		'orange',
		'red',
		'yellow',
		'black',
		'white'
	];

	$scope.theme = 'bla';

	$scope.load = function()
	{
		chrome.storage.local.get('theme', function(data) {
			console.debug(data);
			if (!data.theme)
			{
				$scope.setTheme($scope.themes[0]);
			}
			$scope.theme = data.theme;
			$scope.$apply();
		})
	}

	$scope.setTheme = function(theme)
	{
		$scope.theme = theme;
		chrome.storage.local.set({'theme' : theme});
	}

	$scope.nextTheme = function()
	{
		var currentIndex = _.indexOf($scope.themes, $scope.theme);
		var nextIndex = (currentIndex + 1) >= $scope.themes.length ? 0 : currentIndex+1;

		$scope.setTheme($scope.themes[nextIndex]);
	}
}