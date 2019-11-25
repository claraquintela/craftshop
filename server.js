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
  dbo
    .collection("users")
    .find({})
    .toArray((err, user) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }
      res.send(
        JSON.stringify({
          user
        })
      );
    });
});
app.get("/allproducts", (req, res) => {
  dbo
    .collection("products")
    .find({})
    .toArray((err, products) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }

      products = products.slice(-12).reverse();
      res.send(JSON.stringify(products));
    });
});
app.post("/reviews", upload.none(), (req, res) => {
  console.log("review", req.body.itemId);
  let itemId = req.body.itemId;
  dbo
    .collection("reviews")
    .find({ reviewedItemId: itemId })
    .toArray((err, reviews) => {
      if (err) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      res.send(JSON.stringify(reviews));
    });
});

app.post("/signup", upload.single("img"), (req, res) => {
  console.log("Signup are you working?");
  let name = req.body.username;
  let pwd = req.body.password;
  let location = req.body.location;
  let file = req.file;
  let imgPath = "/uploads/" + file.filename;
  console.log("backend image", imgPath);
  dbo.collection("users").findOne(
    {
      username: name
    },
    (err, user) => {
      if (err) {
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
          password: pwd,
          location: location,
          image: imgPath
        });
        let sessionId = generateId();
        sessions[sessionId] = name;
        res.cookie("sid", sessionId);
        res.json(
          JSON.stringify({
            success: true
          })
        );
        return;
      }
    }
  );
});

app.post("/login", upload.none(), (req, res) => {
  let name = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne(
    {
      username: name
    },
    (err, user) => {
      if (err) {
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
  let search = req.body.search;
  let minPrice = req.body.minPrice;
  let maxPrice = req.body.maxPrice;
  let inStock = req.body.inStock;
  let filteredItems = undefined;
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
        res.send(
          JSON.stringify({
            success: false
          })
        );
        return;
      }

      if (!inStock || inStock === undefined) {
        filteredItems = items.filter(item => {
          return (
            Number(item.price) >= Number(minPrice) &&
            Number(item.price) <= Number(maxPrice)
          );
        });

        res.send(
          JSON.stringify({
            success: true,
            items: filteredItems
          })
        );
        return;
      }
      {
        filteredItems = items.filter(item => {
          return (
            Number(item.price) >= Number(minPrice) &&
            Number(item.price) <= Number(maxPrice) &&
            Number(item.quantity) > 0
          );
        });

        res.send(
          JSON.stringify({
            success: true,
            items: filteredItems
          })
        );
      }

      return;
    });
});

app.post("/new-product", upload.single("img"), (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let quantity = req.body.quantity;
  let file = req.file;
  let username = req.body.username;
  let imgPath = "/uploads/" + file.filename;
  dbo.collection("products").insertOne({
    description: description,
    image: imgPath,
    username: username,
    price: price,
    title: title,
    quantity: quantity
  });
  res.send(
    JSON.stringify({
      success: true
    })
  );
  return;
});
app.get("/allproducts", (req, res) => {
  dbo
    .collection("products")
    .find({})
    .toArray((err, ps) => {
      if (err) {
        res.send("fail");
        return;
      }
      res.send(JSON.stringify(ps));
    });
});
app.post("/logout", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];

  if (username === undefined) {
    res.send(JSON.stringify({ success: false }));
    return;
  }
  delete username;
  res.cookie("sid", 0, { expires: -1 });
  res.send(JSON.stringify({ success: true }));
  return;
});

app.post("/submitReview", upload.none(), (req, res) => {
  let review = req.body.review;
  let reviewer = req.body.username;
  let reviewedItem = req.body.itemId;
  dbo.collection("reviews").insertOne({
    review: review,
    reviewerId: reviewer,
    reviewedItemId: reviewedItem
  });
  res.send(
    JSON.stringify({
      success: true
    })
  );
  return;
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
