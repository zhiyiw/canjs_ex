steal(
	'./nav.css'
)
.then(function() {
	can.Control("App.NavCtrl", {
		init: function(element) {
			this.element.html(can.view(window.user_path + 'nav/view/nav.ejs'));
		}
	});
	new App.NavCtrl("#nav");
});