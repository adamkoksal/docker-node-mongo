const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
var cors = require('cors')

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(
  express.static(path.join(__dirname, "../client/build"))
);

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require("./models/Item");

app.get("/items", (req, res) => {
  // res.send([{name: "test"}])
  Item.find()
    .then(items => res.send(items))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post("/item", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.send(item));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
