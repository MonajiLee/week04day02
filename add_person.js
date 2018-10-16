// MIDDLEWARE & SETUP ------------------------------------------

const pg = require("pg");
const settings = require("./settings");

const knex = require('knex')({
    client: 'pg',
    version: '5.6.0',
    connection: {
      host : settings.host,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
});


// CONNECT/INSERT/DISCONNECT FROM DATABASE ------------------------

knex.insert({ 
    first_name: `${process.argv[2]}`, 
    last_nae: `${process.argv[3]}`, 
    birthdate: `${process.argv[4]}` 
    })
    .into('famous_people')
    .then({return: true})
    .then(function() {
        knex.destroy()
    });