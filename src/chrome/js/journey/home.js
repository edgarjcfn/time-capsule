$(document).ready( function () {

    $('#btn-facebook').jn_social_button({
      connector : 'facebook'
    });

    $('#btn-twitter').jn_social_button({
      connector : 'twitter'
    });

    $('#btn-google-plus').jn_social_button({
      connector : 'googleplus'
    });

    $('#btn-instagram').jn_social_button({
      connector : 'instagram'
    });
    
  }
);


function checkFacebookConnection()
{

  // $("#fb-connect").on("click", function() {
  //   connectFacebook();
  // });
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

