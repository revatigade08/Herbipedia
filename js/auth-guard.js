import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const publicPages = ["index.html", "login.html", "register.html"];

function getCurrentPage() {
  return window.location.pathname.split("/").pop() || "index.html";
}

onAuthStateChanged(auth, (user) => {

  const page = getCurrentPage();

  const navLogin = document.getElementById("navLogin");
  const navRegister = document.getElementById("navRegister");
  const nav3D = document.getElementById("nav3D");
  const navAbout = document.getElementById("navAbout");
  const navContact = document.getElementById("navContact");
  const navProfile = document.getElementById("navProfile");
  const navLogout = document.getElementById("navLogout");

  if (!user) {

    // 🚫 Redirect if trying to access protected page
    if (!publicPages.includes(page)) {
      window.location.replace("login.html");
      return;
    }

    // Show only public nav items
    if (navLogin) navLogin.style.display = "inline-block";
    if (navRegister) navRegister.style.display = "inline-block";

    if (nav3D) nav3D.style.display = "none";
    if (navAbout) navAbout.style.display = "none";
    if (navContact) navContact.style.display = "none";
    if (navProfile) navProfile.style.display = "none";
    if (navLogout) navLogout.style.display = "none";

  } else {

    // Hide login/register
    if (navLogin) navLogin.style.display = "none";
    if (navRegister) navRegister.style.display = "none";

    // Show protected nav items
    if (nav3D) nav3D.style.display = "inline-block";
    if (navAbout) navAbout.style.display = "inline-block";
    if (navContact) navContact.style.display = "inline-block";
    if (navProfile) navProfile.style.display = "inline-block";
    if (navLogout) navLogout.style.display = "inline-block";

    // Logout logic (only attach once)
    if (navLogout && !navLogout.dataset.listener) {
      navLogout.dataset.listener = "true";
      navLogout.addEventListener("click", async (e) => {
        e.preventDefault();
        await signOut(auth);
        window.location.replace("index.html");
      });
    }
  }
});
