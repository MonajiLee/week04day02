// MIDDLEWARE & SETUP ------------------------------------------

const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client ({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
});

// CALLBACK FUNCTION ----------------------------------------------

function printValue(arr){
  arr.forEach(function(input, i){
    console.log(`- ${i + 1}: ${input.first_name} ${input.last_nae}, born ${input.birthdate.toISOString().split('T')[0]}`);
  });
}

// CONNECT/QUERY/DISCONNECT FROM DATABASE ------------------------

client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }

    client.query(`SELECT * FROM famous_people WHERE first_name LIKE $1`, [process.argv[2]], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }

      // Format of Database Response Query Experience
      console.log('Searching ...');
      console.log(`Found ${result.rows.length} person(s) by the name '${process.argv[2]}'`);
      printValue(result.rows);

      client.end();
    });
  });