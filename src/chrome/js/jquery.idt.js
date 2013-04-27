// https://github.com/craigkoster/jQuery-Input-Default-Text-Plugin

(function($)
{
    //create plugin
    $.fn.idt = function(options)
    {
    	//set up settings from options to provide defaults
    	var settings = $.extend(
    	{
	      'defaultText' : 'Enter data here...'
	    }, options);
    
	    //loop each item that is hooked
        return this.filter("input").each(function()
        {
        	//set initial text
        	$(this).val(settings.defaultText);
        
            //bind focus and blur to clear / set default text
            $(this).bind("focus", function(event) { if($(this).val() == settings.defaultText) { $(this).val(""); } else { $(this).select(); } }).bind("blur", function(event) { if(!$(this).val()) { $(this).val(settings.defaultText); } });
        });
    };
}(jQuery));