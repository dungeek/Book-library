const { MongoClient } = require('mongodb');

require('dotenv').config(); // loads environment variables from file .env into the current process

const username = process.env.MONGODB_USERNAME; // secret
const password = process.env.MONGODB_PASSWORD; // secret
const host = process.env.MONGODB_HOST || 'localhost';
const port = process.env.MONGODB_PORT || 27017;
const database = process.env.MONGODB_DATABASE;

let uri = 'mongodb://';
/* Sets up MongoDB URI */ {
    if (!!username && !!password) {
        uri += username + ':' + password + '@';
    }
    uri += host + ':' + port + '/' + database;
    console.log('MongoDB URI: ' + uri);
}

const client = new MongoClient(uri);
const db = client.db(database);

/**
 * Closes the connection between the client and the MongoDB Server.
 */
async function close() {
    return client.close();
}

module.exports = {
    client,
    db,
    close,
};