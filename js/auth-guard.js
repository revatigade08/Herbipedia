import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const publicPages = ["index.html", "login.html", "register.html"];
const authPages = ["login.html", "register.html"];

function getCurrentPage() {
  return window.location.pathname.split("/").pop();
}

function isPublicPage() {
  const page = getCurrentPage();
  return publicPages.includes(page) || page === "";
}

onAuthStateChanged(auth, (user) => {

  const page = getCurrentPage();
  const navbar = document.getElementById("navbar");

  // 🔹 Hide entire navbar on login/register
  if (authPages.includes(page) && navbar) {
    navbar.style.display = "none";
  }

  const nav3D = document.getElementById("nav3D");
  const navAbout = document.getElementById("navAbout");
  const navContact = document.getElementById("navContact");
  const navLogin = document.getElementById("navLogin");
  const navRegister = document.getElementById("navRegister");
  const navLogout = document.getElementById("navLogout");

  if (!user) {

    if (!isPublicPage()) {
      window.location.replace("index.html");
      return;
    }

    if (navLogin) navLogin.style.display = "inline-block";
    if (navRegister) navRegister.style.display = "inline-block";

    if (nav3D) nav3D.style.display = "none";
    if (navAbout) navAbout.style.display = "none";
    if (navContact) navContact.style.display = "none";
    if (navLogout) navLogout.style.display = "none";

  } else {

    if (navLogin) navLogin.style.display = "none";
    if (navRegister) navRegister.style.display = "none";

    if (nav3D) nav3D.style.display = "inline-block";
    if (navAbout) navAbout.style.display = "inline-block";
    if (navContact) navContact.style.display = "inline-block";
    if (navLogout) navLogout.style.display = "inline-block";

    if (navLogout) {
      navLogout.addEventListener("click", async (e) => {
        e.preventDefault();
        await signOut(auth);
        window.location.replace("index.html");
      });
    }
  }
});
