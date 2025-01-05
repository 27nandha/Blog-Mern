import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddBlog.css'

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return alert("You need to log in to create a blog!");
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/createBlog", // Backend route for creating blogs
        { title, content, author },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );

      if (response.data.success) {
        alert("Blog created successfully!");
        navigate("/"); // Redirect to Home after blog creation
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create the blog!");
    }
  };

  return (
    <div className="add-blog-container">
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="add-blog-form">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            placeholder="Enter your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
