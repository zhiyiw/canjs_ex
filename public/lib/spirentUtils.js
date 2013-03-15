$(function() {
	window.enableErrorMessage = function(flag) {
	    if(flag) {
	        $("#message").bind("ajaxError", function(e, jqXHR, settings, exception) {
	            $(".spinnerbig").hide();
	            var error_message = "";
	            try {
	                error_message = $.parseJSON(jqXHR.responseTest);
	            } catch(e) {
	                error_message = e;
	                error_message["success"] = false;
	            }

	            new Global.App.Message("#message");
	        });
	    } else {
	        $("#message").unbind("ajaxError");
	    }
	}

	window.user_path = "/canjs/app/";
}());