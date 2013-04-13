$(document).ready( function () {

    $('#btn-facebook').jn_social_button({
      connector : 'facebook',
      authorize_callback : function () {
        console.log('connected to facebook');
      }
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

