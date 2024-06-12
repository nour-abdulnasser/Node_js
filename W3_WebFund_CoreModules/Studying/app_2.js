/**
 * Intro to Modules
 * First API
 */

/**
 * Our Data
 */

let users = [
  { name: "nour", age: 23, position: "junior backend engineer" },
  { name: "hi", age: 3, position: "kid" },
  { name: "nour", age: 25, position: "senior engineer" },
];
let posts = [
  { poster: "nour", time: 23, content: "junior backend engineer" },
  { poster: "hi", time: 3, content: "kid" },
  { poster: "nour", time: 25, content: "senior 0engineer" },
  { poster: "nour", time: 28, content: "senior 0engineer" },
];

/* **** FS Module **** */

const fs = require("fs");

/* **** HTTP Module **** */

const http = require("node:http");

// we want to create an http server for our app
// server takes in callback function with the request and response
let port = http.createServer((req, res) => {
  res.setHeader("content-type", "application/json"); // to view response as an api without the help of an extension

  console.log(req); // note: you'll find details of the request like url and method

  // note: we can base our responses off of the metadata of the request
  if (req.url == "/users" && req.method == "GET") {
    // note: end() takes in strings only, so to use it you want to stringify your db
    res.end(JSON.stringify(users));
  } else if (req.url == "/posts" && req.method == "GET") {
    res.end(JSON.stringify(posts));
  } else {
    res.end(JSON.stringify({ message: "not found" }));
  }
});

/*
 * create port
 */
port.listen(3000, "127.0.0.1", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server is running...");
});


/**
 * NOTE: on Terminal Commands
 */

// "scripts" in package.json is very important production-wise and development-wise
// "main" should be the starting file that you use in the [[ node <filname.js> ]] terminal command
// "start": 'nodemon index.js' in  + [[ npm start ]]
// [[ npm run xx ]] when xx is not a reserved word sn you used it package.son like "xx":"node index.js" 
// look up how to publish to npm