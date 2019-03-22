const msgModel = require('./models/msgModel');
let express = require('express');
let router = express.Router();
/* GET messages */
router.get('/messages', function(req, res) {
	msgModel.getMessages((error, data)=> {
		if(error) res.sendStatus(500);
		
		res.status(200).json(data || [] );
	});
});
module.exports = router;