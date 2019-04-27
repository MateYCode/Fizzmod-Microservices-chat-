const restClient = require('../utils/restClient');
const fetch = require('node-fetch');

let getMessages = async () => {
    const url = "http://127.0.0.1:8080/messages";
    try {
        console.log(" im hereeeeee in the try!!")
        const data = await fetch(url)
        console.log(" im hereeeeee after the fetch")
        const messages = await data.json()
        return messages;
    }
    catch (err) {
        console.log(" im hereeeeee in the errorrrr side ")
        console.log(" el error es: ", err)
        return err;
    }
}

const createMessage = function (user, cb) {

}

module.exports = {
    getMessages,
    createMessage
}