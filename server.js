let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");

let upload = multer({
  dest: __dirname + "/uploads/"
});
let sessions = {};
let cookieParser = require("cookie-parser");
app.use(cookieParser());
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
app.get("/allusers", (req, res) => {
  console.log("request to /allusers");
  dbo
    .collection("users")
    .find({})
    .toArray((err, user) => {
      if (err) {
        console.log("err", err);
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      console.log("users", user);
      res.send(
        JSON.stringify({
          user
        })
      );
    });
});
app.get("/allproducts", (req, res) => {
  console.log("request to /allproducts");
  dbo
    .collection("products")
    .find({})
    .toArray((err, products) => {
      if (err) {
        console.log("error", err);
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }

      products = products.slice(-4);
      console.log("products", products);
      res.send(JSON.stringify(products));
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

app.post("/search", upload.none(), (req, res) => {
  console.log("search hit ", req.body.search, req.body.minPrice);
  let search = req.body.search;
  let minPrice = req.body.minPrice;
  let maxPrice = req.body.maxPrice;
  dbo
    .collection("products")
    .find({
      title: {
        $regex: new RegExp(search),
        $options: "?i"
      }
    })
    .toArray((err, items) => {
      if (err) {
        console.log("/search error", err);
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }

      items = items.filter(item => {
        return (
          Number(item.price) > Number(minPrice) &&
          Number(item.price) < Number(maxPrice)
        );
      });
      res.send(
        JSON.stringify({
          success: true,
          items: items
        })
      );
      return;
    });
});

app.post("/new-product", upload.single("img"), (req, res) => {
  console.log("request to /new-product. body: ", req.body);
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  console.log("username", username);
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  console.log("files", req.file);
  let file = req.file;
  let imgPath = "/uploads/" + file.filename;
  dbo.collection("products").insertOne({
    description: description,
    image: imgPath,
    username: username,
    price: Number(price),
    title: title
  });
  res.send(
    JSON.stringify({
      success: true
    })
  );
  return;
});
app.get("/allproducts", (req, res) => {
  console.log("request to /allproducts");
  dbo
    .collection("products")
    .find({})
    .toArray((err, ps) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      console.log("products", ps);
      res.send(JSON.stringify(ps));
    });
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
