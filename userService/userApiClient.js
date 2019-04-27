const restClient = require( '../utils/restClient' );

const getUsers = async function() {
    const usersUrl = "http://127.0.0.1:9090/users";
    return restClient.get(usersUrl)
    .then( users => {
        return users
    })
	.catch( err => err)
}

const createUser = function( user, cb ) {

}

module.exports = {
	getUsers,
	createUser
}