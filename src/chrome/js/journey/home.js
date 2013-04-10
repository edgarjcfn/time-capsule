$(document).ready( function () {
    showFbConnect();
    showTwitterConnect();
  }
);


function showFbConnect()
{
  var fbConnectHref = "https://www.facebook.com/dialog/oauth?client_id=197666783690495&redirect_uri=http://www.facebook.com/connect/login_success.html&scope=email&response_type=token";
  var fbDiv = $("#fb-connect");

  if (localStorage.fb_access_token)
  {
    fbDiv.html(localStorage.fb_access_token);
  }
  else
  {
    fbDiv.html("<a href='" + fbConnectHref + "'> <img src='"+ chrome.extension.getURL('img/facebook.png')+ "' /> </a>");
  }
}

function showTwitterConnect()
{
  var twitterDiv = $("#tw-connect");

  twitterDiv.html("<a href='#'> <img src='"+ chrome.extension.getURL('img/twitter.png')+ "' /> </a>")
}

