import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp }
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Form reference
const form = document.getElementById("registerForm");

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

// Register logic
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const gender = document.getElementById("gender").value;
  const dob = document.getElementById("dob").value;

  try {
    const userCredential =
      await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      username,
      contact,
      email,
      gender,
      dob,
      createdAt: serverTimestamp()
    });

    alert("Registration successful!");
    window.location.href = "login.html";

  } catch (error) {
    alert("Registration failed: " + error.message);
    window.location.href = "index.html";
  }
});
