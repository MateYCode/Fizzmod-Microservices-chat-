const mysqlLib = require('../../utils/mysqlUtils');
var msgModel = {};
msgModel.getMessages = (callback) => {
	mysqlLib.getConnection((err, connection) => {
		if (err) return callback(err);
		const sql = 'SELECT * FROM messages';
		connection.query(sql, function (error, row) {
			connection.release();
			if (error) {
				throw error;
			}
			callback(null, row);
		});
	});
};
module.exports = msgModel;