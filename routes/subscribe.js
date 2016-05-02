var mcapi = require('mailchimp-api/mailchimp');

mc = new mcapi.Mailchimp('221a3fdf80cf4a0702f6af91687ca670-us13');

exports.subscribe = function (req, res) {
	var listId = '45785cb28f';
	mc.lists.subscribe({id: listId, email: {email: req.body.email}}, function (data) {
		// req.session.success_flash = 'User subscribed successfully! Look for the confirmation email.';
		res.redirect('/lists/' + listId);
	}, function (error) {
		if (error.error) {
			req.session.error_flash = error.code + ': ' + error.error;
		} else {
			req.session.error_flash = 'There was an error subscribing that user';
		}
		res.redirect('/lists/' + listId);
	});
};
