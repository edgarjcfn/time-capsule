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

function NewsFeedController($scope, config, facebook)
{
    $scope.loaded = false;
    $scope.db = {};
    $scope.currentTab = -1;
    $scope.hasContent = false;
    $scope.facebookFeed;

    $scope.load = function() 
    {
        chrome.storage.sync.get('services', function(data) {
            
            if (! (data.services))
            {
                data.services = {};
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
        var connectUrl = config.OauthConnectUrl.replace('{service}', service);
        var createdId = -1;
        
        chrome.tabs.create({url:connectUrl, openerTabId:$scope.currentTab}, function(tab) {
            createdId = tab.id;
        });

        chrome.tabs.onUpdated.addListener(function(changedTabId, changeInfo, changedTab) {
            if (changedTabId == createdId && changeInfo.url)
            {
                var successUrl = config.OauthSuccessUrl.replace('{service}', service);
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
        var fb_token = $scope.db.services['facebook']['token'];
        facebook.getLastYearsPosts(fb_token, function(result) 
        {
            $scope.facebookFeed = result;
            $scope.loaded = true;
            $scope.hasContent = (result.statuses && result.statuses.data.length > 0) || (result.photos && result.photos.data.length > 0);
            $scope.$apply();

            console.debug(result);
        });
    }
}