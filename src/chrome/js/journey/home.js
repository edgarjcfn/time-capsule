$(document).ready( function () {
    checkFacebookConnection();
    checkTwitterConnection();
  }
);


function checkFacebookConnection()
{
  $("#fb-connect").on("click", function() {
    connectFacebook();
  });
}

function connectFacebook()
{
  var fbAuth = new OAuth2('facebook', 
    {
      'client_id' : '197666783690495',
      'client_secret' : 'fd813c9bac5c49d7e2d02a386176f1a3'
    });

  fbAuth.authorize(function () {
    console.log("executing callback...");
    var token = fbAuth.getAccessToken();
    console.log(token);    
  });
}

function checkTwitterConnection()
{
  
}

