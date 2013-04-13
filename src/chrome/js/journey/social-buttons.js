(function( $ ){

  $.fn.jn_social_button = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'connector'        : null 
    }, options);

    return this.each(function() {        

      if (settings.connector == null)
      {
      	console.log('cannot use jn_social_button without a connector')
      	return;
      }

      var inactiveImagePath = "./img/social/inactive/"+ settings.connector +".png";
      var activeImagePath = "./img/social/active/"+ settings.connector +".png";
      var image = $('<img src="'+inactiveImagePath+'"/>');

      if (localStorage['oauth2_'+settings.connector] != null)
      {
      	image.attr('src', activeImagePath);
      	$(this).append(image);
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
	      	});     

	    $(this).append(anchor.append(image)); 	
      }      

    });

  };
})( jQuery );