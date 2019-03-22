const userModel = require('./models/userModel');
let express = require('express');
let router = express.Router();
/* GET users */
router.get('/users', function(req, res) {
	userModel.getUsers((error, data)=> {
		if(error) return res.sendStatus(500);

		res.status(200).json(data || [] );
	});
});
router.post('/users', function(req, res) {
	userModel.createUser((error, data)=> {
		if(error) return res.sendStatus(500);

		res.sendStatus(201);
	});
});

module.exports = router;