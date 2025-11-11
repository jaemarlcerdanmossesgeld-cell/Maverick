document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop form from refreshing

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error-message");

  // Temporary login check (You can change credentials later)
  if (username === "admin" && password === "password123") {
    window.location.href = "index.html"; // ✅ redirect to Maverick page
  } else {
    error.textContent = "Invalid username or password";
  }
});

