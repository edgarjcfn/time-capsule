$(document).ready( function () {
    showFbConnect();
  }
);


function showFbConnect()
{
  var fbConnectHref = "https://www.facebook.com/dialog/oauth?client_id=197666783690495&redirect_uri=http://www.facebook.com/connect/login_success.html&scope=email&response_type=token";
  var fbDiv = $("#fb-content");

  if (localStorage.accessToken)
  {
    fbDiv.html(localStorage.accessToken);
  }
  else
  {
    fbDiv.html("<a href='" + fbConnectHref + "'> Connect To Facebook</a>");
  }
}

