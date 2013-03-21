steal.packages('apps/contacts', 'apps/about')
.then(
    'jquery'
)
.then(
	'jquery-migrate',
    'jquery-ui'
)
.then(
    'can-jquery',
    'lib/spirentUtils.js'
)
.then(function(){
    // restore the globe states from sessionStorage

    if (!window.sessionStorage ) {
        window.sessionStorage = {}; // make it compatible for non-HTML5 browsers
    }

    // app_state stores the application states so it can be refered globally
    if(!window.app_state){
        var old_state =  window.sessionStorage["app_state"];
        if(!old_state || old_state.length == 0){
            old_state = "{}";
        }
        window.app_state = new can.Observe(JSON.parse(old_state));
        app_state.bind( 'change', function( ev, attr, how, newVal, oldVal ) {
           window.sessionStorage["app_state"] = JSON.stringify(window.app_state._data.valueOf());
        });
    }
    // create a route
    can.route( ':widget' );

    var Routing = can.Control({
        ':widget route': function(data) {
            this.handle_route(data);
        },
        handle_route: function(data){
        	var self = this;
            var widget = data['widget'];

            if(widget === 'contacts') {
                self.cleanElement('contents');
                steal('apps/contacts', function() {
                	new App.ContactsCtrl("#contents");
                });
            } else if(widget === 'about') {
                self.cleanElement('contents');
                steal('apps/about', function() {
                	new App.AboutCtrl("#contents");
                });
            }
            app_state.attr('route', {'widget': widget});
        },
        cleanElement: function(element_id) {
            var parent = $("#"+element_id).parent();
            $("#"+element_id).remove();
            parent.append('<section id="'+element_id+'"></section>');
        }
    })
    // create routing control
    new Routing( document.body );
})
.then(
	'css/global.css',
	'lib/can.control.plugin.js'
)
.then('apps/nav', 'apps/user');