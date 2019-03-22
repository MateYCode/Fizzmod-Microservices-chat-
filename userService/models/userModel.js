const mysqlLib = require('../../utils/mysqlUtils');
let userModel = {};
userModel.getUsers = (callback) => {
	mysqlLib.getConnection((err, connection) => {
		if (err) return callback(err);
		const sql = 'SELECT * FROM users';
		connection.query(sql, function (error, row) {
			connection.release();
			if (error) {
				throw error;
			}
			callback(null, row);
		});
	});
};
userModel.createUser=(callback)=>{
	connection.query('CREATE TABLE IF NOT EXISTS user(id_user int auto_increment primary key, firstname varchar(30),lastname varchar(30),nickname varchar(30) unique,email varchar(50) unique,created_date timestamp,lastUpdate timestamp,id_status int,constraint `user-status` foreign key(id_status) references status_user(id_status) on update cascade on delete restrict)', function (err) {
		if (err) throw err;
		connection.query('INSERT INTO users SET ?', usernames, function (err,res) {
			if (err) throw err;
			let id = res.insertId
			callback(null, { 'insertId': res.insertId });
		});
	});
}
module.exports = userModel;



//CREATE TABLE IF NOT EXISTS status_user(id_status int auto_increment not null primary key, description varchar(20) unique) 
//CREATE TABLE IF NOT EXISTS status_msg(id_status_msg int auto_increment not null primary key, description varchar(20)unique)
//CREATE TABLE IF NOT EXISTS message(id_msg int auto_increment not null primary key,created_at timestamp not null,last_update timestamp not null,id_user int,id_status_msg int,constraint `user-msg` foreign key(id_user) references user(id_user) on update cascade on delete restrict,constraint `msg-msg_status` foreign key(id_status_msg) references status_msg(id_status_msg) on update cascade on delete restrict)
//CREATE TABLE IF NOT EXISTS user(id_user int auto_increment primary key, firstname varchar(30),lastname varchar(30),nickname varchar(30) unique,email varchar(50) unique,created_date timestamp,lastUpdate timestamp,id_status int,constraint `user-status` foreign key(id_status) references status_user(id_status) on update cascade on delete restrict)
//INSERT INTO status_user values(null,'Connected')
//INSERT INTO status_user values(null,'Disconnected')
//INSERT INTO chat.status_msg values(null,'Read')
//INSERT INTO chat.status_msg values(null,'Not Read')
//INSERT INTO chat.user values(null,'Viena','Cattz','viena','viena@gmail.com',20190319112030,null,1)