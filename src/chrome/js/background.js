function onFacebookLogin() {
    if (!localStorage.accessToken) {
        var successURL = 'https://www.facebook.com/connect/login_success';
        chrome.tabs.getAllInWindow(null, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].url.indexOf(successURL) == 0) {
                    var params = tabs[i].url.split('#')[1];
                    localStorage.accessToken = getParameterByName(params, "access_token");
                    chrome.tabs.onUpdated.removeListener(onFacebookLogin);

                    return;
                }
            }
        });
    }
}

function getParameterByName(params, name)
{
  params = params.split(/=|&/);
  for (var i=0; i < params.length; i++)
  {
    document.write(params[i]);
    if (params[i] == name)
    {
      return params[i+1];
    }
  }

  return "";
}

 chrome.tabs.onUpdated.addListener(onFacebookLogin);  
