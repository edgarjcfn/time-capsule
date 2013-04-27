$(document).ready( function () {

    $('#btn-facebook').jn_social_button({
      connector : 'facebook',
      callback  : function () {
        addToPastNewsfeed('facebook');
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

    $('#future-box').idt({
      defaultText : 'ex.: achieve ideal weight'
    });
    
  }
);

function addToPastNewsfeed(adapterName)
{
  OAuth2.loadAdapter(adapterName, function() {
    var adapter = OAuth2.adapters[adapterName];

    adapter.getLastYearsPosts( function (posts) {

    })

  });
}

