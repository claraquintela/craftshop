let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let sessions = {};
let upload = multer({
  dest: __dirname + "/uploads/"
});
reloadMagic(app);

app.use("/", express.static("build"));
app.use("/uploads", express.static("uploads"));

let dbo = undefined;
let url =
  "mongodb+srv://craft:Craft123@cluster0-71uur.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(
  url,
  {
    useNewUrlParser: true
  },
  (err, db) => {
    dbo = db.db("project-board");
  }
); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

app.get("/allproducts", (req, res) => {
  console.log("request to /allproducts");
  dbo
    .collection("products")
    .find({})
    .toArray((err, ps) => {
      if (err) {
        console.log("error", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("products", ps);
      res.send(JSON.stringify(ps));
    });
});

app.post("/signup", upload.none(), (req, res) => {
  console.log("signup", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection("users").findOne(
    {
      username: name
    },
    (err, user) => {
      if (err) {
        console.log("/signup error", err);
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (user !== null) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (user === null) {
        dbo.collection("users").insertOne({
          username: name,
          password: pwd
        });
        let sessionId = generateId();
        sessions[sessionId] = name;
        res.cookie("sid", sessionId);
        res.json({
          success: true
        });
        return;
      }
    }
  );
});

app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let name = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne(
    {
      username: name
    },
    (err, user) => {
      if (err) {
        console.log("/login error", err);
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (user === null) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (user.password === password) {
        let sessionId = generateId();
        console.log("generated id", sessionId);
        sessions[sessionId] = name;
        res.cookie("sid", sessionId);
        res.send(
          JSON.stringify({
            success: true
          })
        );
        return;
      }
      res.send(
        JSON.stringify({
          success: false
        })
      );
    }
  );
});

let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};

app.get("/search", upload.none(), (req, res) => {
  console.log("search", req.body.search);
  let search = req.body.search;
  dbo
    .collection("products")
    .find({
      title: search
    })
    .toArray((err, item) => {
      if (err) {
        console.log("/search error", err);
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (item.title !== search) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      if (item.title.includes(search)) {
        res.send(
          JSON.stringify({
            success: true
          })
        );
        return;
      }
    });
});

app.post("/new-item", upload.single("uploadedFile"), (req, res) => {
  console.log("request to /new-item. body: ", req.body);
  let username = req.body.username;
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  let fileType = file.mimetype.split("/")[0];
  dbo.collection("posts").insertOne({
    description: description,
    frontendPath: frontendPath,
    username: username,
    fileType: fileType,
    price: price,
    title: title
  });
  res.send(
    JSON.stringify({
      success: true
    })
  );
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
