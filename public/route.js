(function(){
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
    can.route( ':widget/:sub' );

    var Routing = can.Control({
        ':widget route': function(data) {
            this.handle_route(data);
        },
        ':widget/:sub route': function( data ) {
            this.handle_route(data);
        },
        handle_route: function(data){
            var widget = data['widget'];
            var sub = data['sub'];

            var self = this;

            if(widget === 'account') {
                self.cleanElement('contents');
                var Account = new Global.App.AccountCtrl("#contents");
                if(sub === 'load_users') {
                    Account.load_users(widget);
                }
            }
            app_state.attr('route', {'widget': widget, 'sub': sub});
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