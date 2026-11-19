const API_BASE_URL = "http://localhost:5000/api";

// Connect Register Page to Backend API
async function registerUserAPI(name, email, password) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  return response.json();
}

// Connect Login Page to Backend API
async function loginUserAPI(email, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return response.json();
}

// Fetch Blogs for Home & Dashboard Pages
async function fetchBlogsAPI() {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  return response.json();
}

// Connect Create Blog Page to Backend API
async function createBlogAPI(title, author, content) {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, content })
  });
  return response.json();
}
