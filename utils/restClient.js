const http = require( 'http');
const config = require( '../config' );
const fetch = require('node-fetch');

module.exports = {
	get : async ( urlEntity ) => {
        try {
            const data = await fetch(urlEntity)
            const entity = await data.json()
            return entity;
          }
          catch (err) {
            return err;
          }
	},

	post : async ( entity, data ) => {
		return new Promise( ( resolve, reject ) => {

		} );
	}
}