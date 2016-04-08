var mcapi = require('mailchimp-api/mailchimp');

mc = new mcapi.Mailchimp('');

exports.subscribe = function(req, res){
  mc.lists.subscribe({id: req.params.id, email:{email:req.body.email}}, function(data) {
      req.session.success_flash = 'User subscribed successfully! Look for the confirmation email.';
      res.redirect('/lists/'+req.params.id);
    },
    function(error) {
      if (error.error) {
        req.session.error_flash = error.code + ": " + error.error;
      } else {
        req.session.error_flash = 'There was an error subscribing that user';
      }
      res.redirect('/lists/'+req.params.id);
    });
};