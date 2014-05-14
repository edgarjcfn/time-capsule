function AuthController($scope, $location) {
	$scope.message = "";

	$scope.authenticate = function() {

		var service = ($location.search()).jnfs;
		if (service)
		{
			OAuth.initialize('Jqpu2-jbgWTGiEAFY3JYMeEflvU');
			OAuth.popup(service, function(error, result) {
				  alert(error);
				  alert(result);
				  console.debug(error);
				  console.debug(result);
				  $scope.message = "Authenticated";
				  $scope.$apply();
			});
			$scope.message = "Authenticating " + service;
		}

	}
}