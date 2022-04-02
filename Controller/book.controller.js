const express = require("express");
const Item = require("../Model/book.model");

const auth = require("./middleware")
const router = express.Router();

router.post("", auth,async (req, res) => {
  console.log(req.user);
  try {
    const newBook = await Item.create({...req.body, user_id: req.user._id});
    return res.send(newBook);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const getBook = await Item.find();

    return res.send(getBook);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/find", auth, async (req, res) => {
  try {
    const find_user = await Item.find({user_id: req.user._id});

    return res.send(find_user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
