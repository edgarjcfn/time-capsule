function getQueryString(url)
{
    return /^[^#?]*(\?[^#]+|)/.exec(url)[1];
}

function getParameterByName(url, name) {
    var queryString = getQueryString(url);
    // Escape special RegExp characters
    name = name.replace(/[[^$.|?*+(){}\\]/g, '\\$&');
    // Create Regular expression
    var regex = new RegExp("(?:[?&]|^)" + name + "=([^&#]*)");
    // Attempt to get a match
    var results = regex.exec(queryString);
    return decodeURIComponent(results[1].replace(/\+/g, " ")) || '';
}

function NewsFeedController($scope, oauth)
{
    $scope.loaded = false;
    $scope.db = {};
    $scope.currentTab = -1;
    $scope.facebookFeed;

    $scope.load = function() 
    {
        chrome.storage.sync.get('services', function(data) {
            $scope.loaded = true;
            if (! (data.services))
            {
                data.services = [];
            }
            $scope.db = data;
            $scope.$apply();

            $scope.getFacebookFeed();
        });

        chrome.tabs.getCurrent(function(tab){
            $scope.currentTab = tab.id;
            $scope.$apply();
        });
    }

    $scope.connect = function(service)
    {
        var connectUrl = oauth.connectUrl.replace('{service}', service);
        var createdId = -1;
        
        chrome.tabs.create({url:connectUrl, openerTabId:$scope.currentTab}, function(tab) {
            createdId = tab.id;
        });

        chrome.tabs.onUpdated.addListener(function(changedTabId, changeInfo, changedTab) {
            if (changedTabId == createdId && changeInfo.url)
            {
                var successUrl = oauth.successUrl.replace('{service}', service);
                if (changeInfo.url.indexOf(successUrl) != -1)
                {
                    if (!$scope.db.services) 
                        $scope.db.services = {};

                    $scope.db.services[service] = {
                        'token' : getParameterByName(changeInfo.url, 'oauth_token')
                    }

                    chrome.storage.sync.set({
                        'services' : $scope.db.services
                    });

                    chrome.tabs.remove(changedTabId);

                    $scope.$apply();

                    $scope.getFacebookFeed();
                }
            }
        });
    }

    $scope.connected = function(service)
    {
        return ($scope.db.services != null) && 
               ($scope.db.services[service] != null);
    }

    $scope.getFacebookFeed = function()
    {
      var oauth_token = $scope.db.services['facebook']['token'];
      var graphAPI = "https://graph.facebook.com/me?access_token=" + oauth_token;

      // Thank you, datejs :)
      var minDate = Date.parse('1 year ago').add(-12).days().getTime() / 1000;
      var maxDate = Date.parse('1 year ago').add(12).days().getTime() / 1000;

      var userFields = [
        'id',
        'name'
      ]

      var imageFields = [
        'created_time',
        'height',
        'width',
        'name',
        'picture',
        'source',
        'link'
      ];

      var statusFields = [
        'message'
      ];

      $.ajax({
        dataType: "json",
        url: graphAPI,
        data: {
          'fields' :  userFields.join() + ',' +
                      'photos.since('+minDate+').until('+maxDate+').fields('+imageFields.join()+'),' + 
                      'statuses.since('+minDate+').until('+maxDate+').fields('+statusFields.join()+')'
        },
        success : function(response) {
            $scope.facebookFeed = response;
            $scope.$apply();

            console.debug(response);
        }
      });
    }
}