var mcapi = require('mailchimp-api/mailchimp');

mc = new mcapi.Mailchimp('f59c83ebb309c9ddcfe277a6df44ee1d-us14');

exports.subscribe = function (req, res, next) {
	var listId = '8ab62a2f79';
	mc.lists.subscribe({id: listId, email: {email: req.body.email}}, function (data) {
		// req.session.success_flash = 'User subscribed successfully! Look for the confirmation email.';
		return res.json({ message: 'Thank you! You have successfully subscribed to receive latest updates about our launch.'});
	}, function (error) {
		if (error) {
			return res.status(400).json({ message: error.error});
		}
	});
};
