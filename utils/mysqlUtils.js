const mysql = require('mysql');
const pool = mysql.createPool(
	{
		connectionLimit : 20,
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'chat'
	}
);
const getConnection = function (cb) {
	pool.getConnection((err ,connection)=> {
		cb(err, connection);
	});
};
module.exports = {getConnection}; 