/**
 * Intro to Modules
 */

/* **** OS Module **** */

// import os from "os" //es6
const os = require("node:os");
os.freemem(); //returns amount of free memory in bytes
console.log(os.freemem());
console.log(os.hostname());
console.log(os.arch());
console.log(os.machine());

/* **** FS Module **** */

const fs = require("fs");
// fs.writeFile();
// console.log('ok');
fs.writeFileSync("./demo.txt", "nour");
// console.log('ok');
// read file sync and read file are different, how? [???]
// console.log(fs.readFile())
console.log(fs.readFileSync("demo.txt", "utf8"));

/* **** HTTP Module **** */

const http = require("http");

// we want to create an http server for our app
let port = http.createServer((req, res) => {
  //to create response which would be viewed on the page
  //   res.end("hiiiii");
  //   response can be in terms of html
  // res.end("<h1>Hi</h1>");
  //   res.setHeader("content-type", "text/html");
  //   res.end(
  //     "<img src='https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg'>"
  //   ); // this doesn't work without setting the content type of the header to html

  // we can also make the response a whole html file
  const htmlContent = fs.readFileSync("./index.html");
  res.setHeader("content-type", "text/html");
  res.end(htmlContent); // this doesn't work without setting the content type of the header to html
});

// note when creating a port: it differs from pc to another,
// some ports are reserved for other applications
// 3000 is on the safe side
port.listen(3000, "127.0.0.1", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server is running...");
});
