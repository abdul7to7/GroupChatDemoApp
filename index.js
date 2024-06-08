const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const fs = require("fs");

const { LocalStorage } = require("node-localstorage");

const localStorage = new LocalStorage("./scratch");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  let data = fs.readFileSync("./data.txt");
  res.write("<body>");
  res.write(`<h1>${data}</h1>`);
  res.write(
    "<form action='/' method='POST'><input type='text' name='msg'/><button type='submit'>send</button></form>"
  );
  res.write("</body>");
  res.end();
});

app.post("/", (req, res) => {
  let data = req.body;
  fs.appendFileSync(
    "./data.txt",
    localStorage.getItem("username") + ":" + data.msg + " "
  );
  console.log(data.msg);
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.write("<body>");
  res.write(
    "<form method='POST'><input type='txt' name='username'/><button type='submit'>login</button></form>"
  );
  res.write("</body>");
  res.end();
});

app.post("/login", (req, res) => {
  localStorage.setItem("username", req.body.username);
  res.redirect("/");
});

app.listen(4000);
