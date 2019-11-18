let express = require('express')
let app = express()
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID
let reloadMagic = require('./reload-magic.js')
let multer = require('multer')
let sessions = {}
let upload = multer({
  dest: __dirname + '/uploads/'
})
reloadMagic(app)
app.use('/', express.static('build'));
app.use('/uploads', express.static('uploads'));
let dbo = undefined
let url = "mongodb+srv://craft:Craft123@cluster0-71uur.mongodb.net/test?retryWrites=true&w=majority"

MongoClient.connect(url, {
  useNewUrlParser: true
}, (err, db) => {
  dbo = db.db("project-board")
})

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

// Your endpoints go after this line
app.post('/signup', upload.none(), (req, res) => {
  console.log("signup", req.body)
  let name = req.body.newUser
  let pwd = req.body.newPwd
  dbo.collection('users').findOne({
    username: name
  }, (err, user) => {
    if (err) {
      console.log("/login error", err)
      res.send(JSON.stringify({
        success: false
      }))
      return
    }
    if (user !== null) {
      res.send(JSON.stringify({
        success: false
      }))
      return
    }
    if (user === null) {
      dbo.collection('users').insertOne({
        username: name,
        password: pwd
      })
      let sessionId = generateId()
      sessions[sessionId] = username
      res.cookie('sid', sessionId);
      res.json({
        success: true
      });
      return;
    }

  })
})


app.post('/login', upload.none(), (req, res) => {
  console.log("login", req.body)
  let name = req.body.username
  let password = req.body.password
  dbo.collection('users').findOne({
    username: name
  }, (err, user) => {
    if (err) {
      console.log("/login error", err)
      res.send(JSON.stringify({
        success: false
      }))
      return
    }
    if (user === null) {
      res.send(JSON.stringify({
        success: false
      }))
      return
    }
    if (user.password === password) {
      let sessionId = generateId()
      console.log("generated id", sessionId)
      sessions[sessionId] = username
      res.cookie('sid', sessionId);
      res.send(JSON.stringify({
        success: true
      }))
      return
    }
    res.send(JSON.stringify({
      success: false
    }))
  })
})
let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000)
}
// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});