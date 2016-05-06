var mcapi = require('mailchimp-api/mailchimp');

mc = new mcapi.Mailchimp('221a3fdf80cf4a0702f6af91687ca670-us13');

exports.subscribe = function (req, res, next) {
	var listId = '45785cb28f';
	mc.lists.subscribe({id: listId, email: {email: req.body.email}}, function (data) {
		// req.session.success_flash = 'User subscribed successfully! Look for the confirmation email.';
		return res.redirect('/lists/' + listId);
	}, function (error) {
		if (error) {
			res.error = error.error;
			return next();
		}
		return res.json({message: 'Thank you ! You have subscribed to our customer list successfully'});
	});
};
