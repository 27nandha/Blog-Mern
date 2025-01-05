import express from "express";
import { User } from "../models/model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Blog from "../models/blogMode.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ success: true, message: "Account Created Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in Account Creation" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkeyofNoteapp123@#", {
      expiresIn: "5h",
    });

    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name },
      message: "Logged in Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in login" });
  }
});

router.post("/createBlog", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Create a new blog post
    const newBlog = new Blog({
      title,
      content,
      author,
    });

    // Save the new blog post to the database
    await newBlog.save();

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating blog",
    });
  }
});

// Assuming you're adding it to the auth.js or blog.js file
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find(); // Find all blog posts
    return res.status(200).json({
      success: true,
      blogs, // Send the blog data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving blogs",
    });
  }
});
// In your routes file (auth.js)

router.delete("/deleteBlog/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog by ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting blog" });
  }
});

export default router;

//ntXbMZl8JL7X25fp
