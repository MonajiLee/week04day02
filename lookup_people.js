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


// CONNECT/QUERY/DISCONNECT FROM DATABASE ------------------------

// connect with async/await
client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }

    // query with async/await
            // text (parameterized query), optional values, callback
    client.query(`SELECT * FROM famous_people WHERE first_name LIKE $1`, [process.argv[2]], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(result.rows[0])
      
      // disconnect with async/await
      client.end();
    });
  });