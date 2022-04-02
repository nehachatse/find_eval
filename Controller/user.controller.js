const express = require("express");
const User = require("../Model/User.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find().select("-password");
    return res.status(200).json({ data: user});
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

module.exports = router;
