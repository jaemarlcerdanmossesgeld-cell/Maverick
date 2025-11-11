document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault(); 
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error-message");

  if (username === "admin" && password === "password123") {
    window.location.href = "index.html"; 
  } else {
    error.textContent = "Invalid username or password";
  }
});
