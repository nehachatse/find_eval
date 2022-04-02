const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    author: {type: Number, required: true},
    image: {type: String, required: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
  },
  {
    version_key: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("book", bookSchema);
