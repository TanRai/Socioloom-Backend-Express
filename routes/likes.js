const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/auth");

router.post("/personal/:postId", authMiddleware, (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const like = req.body.like; // true or false
  if (like) {
    db.query(
      `INSERT IGNORE INTO likes (post_id, user_id) VALUES (?, ?)`,
      [postId, userId],
      (err, result) => {
        if (err) console.log(err.message);
        res.json({ message: "Liked" });
      }
    );
  } else {
    db.query(
      `DELETE FROM likes WHERE post_id = ? AND user_id = ?`,
      [postId, userId],
      (err, result) => {
        if (err) console.log(err.message);
        res.json({ message: "Unliked" });
      }
    );
  }
});

module.exports = router;
