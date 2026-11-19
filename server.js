const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory storage for users and blogs
const users = [];
let blogs = [
  {
    id: 1,
    title: "Welcome to BlogSphere Backend",
    author: "Admin",
    date: "Nov 19, 2026",
    content: "This blog post is served directly from the Node.js and Express.js REST API."
  }
];

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "BlogSphere Backend Server is running" });
});

// 1. User Registration API
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  res.status(201).json({
    message: "User registered successfully",
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
});

// 2. User Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  res.json({
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// 3. Get All Blogs API
app.get("/api/blogs", (req, res) => {
  res.json(blogs);
});

// 4. Create Blog API
app.post("/api/blogs", (req, res) => {
  const { title, author, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  const newBlog = {
    id: Date.now(),
    title,
    author: author || "Anonymous",
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }),
    content
  };
  blogs.unshift(newBlog);
  res.status(201).json({ message: "Blog created successfully", blog: newBlog });
});

// 5. Delete Blog API
app.delete("/api/blogs/:id", (req, res) => {
  const blogId = Number(req.params.id);
  blogs = blogs.filter((b) => b.id !== blogId);
  res.json({ message: "Blog deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
