import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Password toggle
const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("togglePassword");

toggleBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "👁";
  }
});

// Login logic
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    alert("Login successful!");
    window.location.href = "index.html";

  } catch (error) {
    alert("Login failed!");
    window.location.href = "index.html";
  }
});
