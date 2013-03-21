steal(
	'./about.css'
)
.then(function() {
	can.Control("App.AboutCtrl", {
		init: function(element) {
			this.container = this.element;
			this.element.html(can.view( window.user_path + 'about/view/about.ejs'));
		}
	});
});