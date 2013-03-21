steal('./contacts.css', function() {
	can.Control("App.ContactsCtrl", {
		init: function(element) {
			this.container = this.element;
			this.element.html(can.view( window.user_path + 'contacts/view/contacts.ejs'));
		}
	});
});