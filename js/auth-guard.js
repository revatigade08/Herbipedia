import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const publicPages = ["index.html", "login.html", "register.html"];

function isPublicPage() {
  const page = window.location.pathname.split("/").pop();
  return publicPages.includes(page) || page === "";
}

onAuthStateChanged(auth, (user) => {

  const nav3D = document.getElementById("nav3D");
  const navAbout = document.getElementById("navAbout");
  const navContact = document.getElementById("navContact");
  const navLogin = document.getElementById("navLogin");
  const navRegister = document.getElementById("navRegister");
  const navLogout = document.getElementById("navLogout");

  if (!user) {

    // Redirect if trying to access restricted page
    if (!isPublicPage()) {
      window.location.replace("index.html");
      return;
    }

    // Show public links
    if (navLogin) navLogin.style.display = "inline-block";
    if (navRegister) navRegister.style.display = "inline-block";

    // Hide restricted links
    if (nav3D) nav3D.style.display = "none";
    if (navAbout) navAbout.style.display = "none";
    if (navContact) navContact.style.display = "none";
    if (navLogout) navLogout.style.display = "none";

  } else {

    // Hide login/register
    if (navLogin) navLogin.style.display = "none";
    if (navRegister) navRegister.style.display = "none";

    // Show restricted links
    if (nav3D) nav3D.style.display = "inline-block";
    if (navAbout) navAbout.style.display = "inline-block";
    if (navContact) navContact.style.display = "inline-block";
    if (navLogout) navLogout.style.display = "inline-block";

    // Logout functionality
    if (navLogout) {
      navLogout.addEventListener("click", async (e) => {
        e.preventDefault();
        await signOut(auth);
        window.location.replace("index.html");
      });
    }
  }
});
