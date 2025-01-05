import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]); // To store fetched blogs
  const [loading, setLoading] = useState(true); // To show loading state

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // Fetch blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/blogs");
        if (response.data.success) {
          setBlogs(response.data.blogs); // Store blogs
        } else {
          alert("Failed to load blogs.");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        alert("Error fetching blogs.");
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    fetchBlogs();
  }, []);

  // Handle blog deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/auth/deleteBlog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setBlogs(blogs.filter(blog => blog._id !== id)); // Remove deleted blog
        } else {
          alert("Failed to delete blog.");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Error deleting blog.");
      }
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">MyApp</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/AddBlog">Add Blog</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Blog List */}
      <div className="home-content">
        <h2>Blog Posts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.content.substring(0, 150)}...</p>
              <p><strong>Author:</strong> {blog.author}</p>
              <p><strong>Created:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>

              {isLoggedIn && (
                <button onClick={() => handleDelete(blog._id)}>Delete</button>
              )}
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
 