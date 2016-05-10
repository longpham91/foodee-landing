var mcapi = require('mailchimp-api/mailchimp');

mc = new mcapi.Mailchimp('221a3fdf80cf4a0702f6af91687ca670-us13');

exports.subscribe = function (req, res, next) {
	var listId = '45785cb28f';
	mc.lists.subscribe({id: listId, email: {email: req.body.email}}, function (data) {
		// req.session.success_flash = 'User subscribed successfully! Look for the confirmation email.';
		return res.json({ message: 'Thank you! You have successfully subscribed to receive latest updates about our launch.'});
	}, function (error) {
		if (error) {
			return res.status(400).json({ message: error.error});
		}
	});
};
