import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const publicPages = ["index.html", "login.html", "register.html"];

function isPublicPage() {
  const path = window.location.pathname.split("/").pop();
  return publicPages.includes(path) || path === "";
}

function setupFloatingLogout() {
  if (document.getElementById("floatingLogout")) return;

  const btn = document.createElement("div");
  btn.id = "floatingLogout";
  btn.innerHTML = `
    <i class="fas fa-home"></i>
    <i class="fas fa-arrow-right"></i>
    <span>Logout</span>
  `;

  document.body.appendChild(btn);

  btn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}

function applyLogoutStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
    #floatingLogout {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 30px;
      background: #ffffff;
      color: #2E7D32;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      z-index: 9999;
    }

    #floatingLogout span {
      width: 0;
      overflow: hidden;
      white-space: nowrap;
      transition: width 0.3s ease;
    }

    #floatingLogout:hover {
      background: #2E7D32;
      color: #fff;
      transform: translateY(-2px);
    }

    #floatingLogout:hover span {
      width: 60px;
    }
  `;
  document.head.appendChild(style);
}

function controlNavbar(user) {
  const navPlants = document.getElementById("navPlants");
  const navAbout = document.getElementById("navAbout");
  const navContact = document.getElementById("navContact");
  const navLogin = document.getElementById("navLogin");
  const navRegister = document.getElementById("navRegister");

  if (user) {
    if (navPlants) navPlants.style.display = "inline";
    if (navAbout) navAbout.style.display = "inline";
    if (navContact) navContact.style.display = "inline";

    if (navLogin) navLogin.style.display = "none";
    if (navRegister) navRegister.style.display = "none";
  } else {
    if (navPlants) navPlants.style.display = "none";
    if (navAbout) navAbout.style.display = "none";
    if (navContact) navContact.style.display = "none";

    if (navLogin) navLogin.style.display = "inline";
    if (navRegister) navRegister.style.display = "inline";
  }
}

onAuthStateChanged(auth, (user) => {

  controlNavbar(user);

  if (user) {
    applyLogoutStyles();
    setupFloatingLogout();
  } else {

    const logoutBtn = document.getElementById("floatingLogout");
    if (logoutBtn) logoutBtn.remove();

    if (!isPublicPage()) {
      window.location.href = "index.html";
    }
  }
});
