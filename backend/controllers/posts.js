const pool = require("../models/db");

const createNewPost = async (req, res) => {
    const user_id = req.token.userId;
  const {content } = req.body;

  const placeholder = [user_id, content];
  try {
    const newPost = await pool.query(
      `INSERT INTO posts (user_id,content) VALUES ($1,$2) RETURNING *`,
      placeholder
    );
    res.status(200).json({
      success: true,
      message: "Created successfully",
      res: newPost.rows,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "server error",
      res: error.message,
    });
  }
};

const getAllPost = async (req,res) => {
    try {
        const post = await pool.query(
          `SELECT * FROM posts`
        );
        res.status(200).json({
          success: true,
          message: "Created successfully",
          res: post.rows,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: "server error",
          res: error.message,
        });
      }
}

const getPostByUserId = async (req,res) => {
    const userId = req.token.userId;
    const placeholder = [userId]
    try {
        const post = await pool.query(
            `SELECT * FROM posts WHERE user_id = $1`,placeholder
          );
          res.status(200).json({
            success: true,
            message: "Created successfully",
            res: post.rows,
          });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Server error",
            res: error.message,
          });
    }
}
module.exports = {
  createNewPost,
  getAllPost,
  getPostByUserId,
};