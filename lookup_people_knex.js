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


// CALLBACK FUNCTION ----------------------------------------------

function printValue(arr){
    arr.forEach(function(input, i){
      console.log(`- ${i + 1}: ${input.first_name} ${input.last_nae}, born ${input.birthdate.toISOString().split('T')[0]}`);
    });
}


// CONNECT/QUERY/DISCONNECT FROM DATABASE ------------------------

knex.from('famous_people').select('*')
.where('first_name', 'like', `%${process.argv[2]}%`)
.asCallback(function(err, rows) {
    if (err) return console.error(err);

    console.log('Searching ...');
    console.log(`Found ${rows.length} person(s) by the name '${process.argv[2]}'`);
    printValue(rows);
    
    knex.destroy();
});
