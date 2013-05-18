var NewsFeed = {};

NewsFeed.addContent = function(adapterName)
{
  OAuth2.loadAdapter(adapterName, function() {
    var adapter = OAuth2.adapters[adapterName];

    adapter.getLastYearsPosts( function (posts) {

      console.debug(posts);

      if (posts.statuses)
      {
        $.each(posts.statuses.data, function(index, value) {
          var statusPost = new StatusPost(value.message, value.updated_time);
          var dom = statusPost.createDom();          
          $("#newsfeed").append(dom);
        });
      }

      if (posts.photos)
      {
        $.each(posts.photos.data, function(index, value) {
          var photoPost = new PhotoPost(value.name, value.created_time, value.source, value.link);
          var dom = photoPost.createDom();          
          $('#newsfeed').append(dom);
        });
      }

      $('.row.story.picture img')
        .css('display', 'block')        
        .nailthumb({width:100,height:100,method:'crop'})
        .css('width', 100)
        .css('height', 100);
    })

  });
};

function StatusPost(message, date) {
  var message =  message;
  var date = date;

  this.createDom = function () {
    var dom = $(
        '<div class="row story status">'+
          '<div class="span7">'+
          '<blockquote>'+
            '<p>'+
             message +
            '</p>'+
            '<small>'+date+'</small>'+
          '</blockquote>'+
        '</div>'+
      '</div>');

    return dom;
  };
};

function PhotoPost(message, date, source, link) {
  var message = message;
  var date = date;
  var source = source;
  var link = link;

  this.createDom = function() {

    var dom = $(
      '<div class="row story picture">' +
        '<div class="span2">' +
          '<img src="'+source+ '" />' +
        '</div>'+
        '<div class="span5">'+
          '<blockquote>'+
          '<p> "'+message+'" </p>'+
          '<small>On ' + date+ '</small>' +
          '</blockquote>'+
        '</div>'+
      '</div>'
      );

    return dom
  };

}

$(document).ready( function () {

    $('#btn-facebook').jn_social_button({
      connector : 'facebook',
      callback  : function () {
        NewsFeed.addContent('facebook');
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


