(function( $ ){

  $.fn.jn_social_button = function( options ) {  

  	//
    // Default option values
    //
    var settings = $.extend( {
      'connector'        : null,
      'authorize_callback' : null
    }, options);

    //
    // Starts the OAuth dance to the specified connector
    //
    var authorize = function(span) 
    {
   		if (settings.connector == null)
      	{
      		console.log('tried to connect but no connector name provided')
      		return;
      	}

    	var oauth = new OAuth2(settings.connector);
    	oauth.authorize( function() {
    		$(span).html('');
    		createButton(span);
    		settings.authorize_callback();
    	});
    }

    //
    // Changes the button state according to the existance of the auth_token
    // 
    var createButton = function( span )
    {
    	var inactiveImagePath = "./img/social/inactive/"+ settings.connector +".png";
   	   	var activeImagePath = "./img/social/active/"+ settings.connector +".png";
  	   	var image = $('<img src="'+inactiveImagePath+'"/>');

	    if (localStorage['oauth2_'+settings.connector] != null)
	    {
	    	image.attr('src', activeImagePath);
	      	$(span).append(image);
	    }
      	else
      	{
      		var anchor = $('<a href="#" > </a>');

	    	anchor
	      		.mouseenter( function() {
	      			image.attr('src', activeImagePath);
	      		})
	      		.mouseleave( function() {
	      			image.attr('src', inactiveImagePath);
	      		})
	      		.click( function() {
	      			authorize(span);
	      		});

	    	$(span).append(anchor.append(image)); 	
      	}    
    }

    //
    // The actual jQuery implementation
    //
    return this.each(function() {        

      	if (settings.connector == null)
      	{
      		console.log('cannot use jn_social_button without a connector')
      		return;
      	}

      	createButton($(this));
	      
    });

  };
})( jQuery );