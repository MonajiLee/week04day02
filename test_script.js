// MIDDLEWARE & SETUP ---------------------

// "node-postgres" (pg): a collection of node.js modules for interfacing with your PostgreSQL database - incl. callbacks, promises, async/await connection ...
const pg = require("pg");

// JSON settings reader for Node.js
const settings = require("./settings");


// Client Definition --------------------

const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
});


// connect with async/await
client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }

    // query with async/await
    client.query("SELECT $1::int AS number", ["1"], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(result.rows[0].number) //output: 1
      
      // disconnect with async/await
      client.end();
    });
  });