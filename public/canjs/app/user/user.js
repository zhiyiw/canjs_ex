steal(
	"./user_model.js",
	"./user.css"
)
.then(function() {
	can.Control("App.UsersCtrl", {
		init: function(element) {
			this.container = this.element;
			this.element.html(can.view( window.user_path + 'user/view/user_layout.ejs'));
			this.init_user_list();
		},
		init_user_list: function(){
			var panel = this.element.find('.user_list');
			var User = App.UserModel;
			User.findAll( {}, function( list ) {
				$.each(list, function() {
					var html = can.view(window.user_path + 'user/view/user_row.ejs', {data: this});
					panel.append(html);
				});
			});
		},
		remove_user: function(ui, event){
			var user_row = ui.parent();
			var user = user_row.data('model');
			user.destroy(function( user ) {
			   user_row.remove();
			});
		},
		read_form: function(obj, form){
			obj['first_name'] = form.find('input#first_name').val();
			obj['last_name']  = form.find('input#last_name').val();
			obj['email'] 	  = form.find('input#email').val();
			return obj;
		},
		clean_form: function(form){
			form.find('input#first_name').val('');
			form.find('input#last_name').val('');
			form.find('input#email').val('');
		},
		'.add_user_btn click': function(ui, event){
			var panel = this.element.find('.user_list');
			var User = App.UserModel;
			var form = ui.parent();
			var data = this.read_form({}, form);
			this.clean_form(form);
			var user = new User( data );
			user.save(function( user ) {
				var html = can.view(window.user_path + 'user/view/user_row.ejs', {data: user});
				panel.append(html);
			});
		},
		'.ur_delete click': function(ui, event){
			this.remove_user(ui, event);
		},
		'.ur_edit click': function(ui, event){
			var user_row = ui.parent();
			var user = user_row.data('model');
			var html = can.view(window.user_path + 'user/view/user_form.ejs', {mode: 'edit', data: user});
			user_row.after(html);
			user_row.remove();
		},
		'.eu_delete click': function(ui, event){
			this.remove_user(ui, event);
		},
		'.eu_save_close click': function(ui, evevnt){
			var form = ui.parent();
			var user = form.data('model');
			user = this.read_form(user, form);
			user._data.first_name = user.first_name;
			user._data.last_name  = user.last_name;
			user._data.email 	  = user.email;
			user.save(function( user ) {
				var html = can.view(window.user_path + 'user/view/user_row.ejs', {data: user});
				form.after(html);
				form.remove();
			});
		}
	});
	new App.UsersCtrl("#contents");
});