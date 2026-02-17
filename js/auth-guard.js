import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

console.log("Auth Guard Loaded");

const publicPages = ["index.html", "login.html", "register.html"];

function isPublicPage() {
  const page = window.location.pathname.split("/").pop();
  return publicPages.includes(page) || page === "";
}

onAuthStateChanged(auth, (user) => {

  console.log("User state:", user);

  if (!user && !isPublicPage()) {
    window.location.replace("index.html");
    return;
  }

  // Create logout button only if logged in
  if (user) {
    if (!document.getElementById("floatingLogout")) {

      const btn = document.createElement("div");
      btn.id = "floatingLogout";
      btn.innerHTML = `
        <i class="fas fa-home"></i>
        <i class="fas fa-arrow-right"></i>
        <span>Logout</span>
      `;

      document.body.appendChild(btn);

      btn.style.position = "fixed";
      btn.style.top = "20px";
      btn.style.right = "20px";
      btn.style.padding = "8px 12px";
      btn.style.borderRadius = "30px";
      btn.style.background = "#fff";
      btn.style.color = "#2E7D32";
      btn.style.cursor = "pointer";
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.gap = "6px";
      btn.style.fontWeight = "600";
      btn.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
      btn.style.zIndex = "9999";

      btn.addEventListener("click", async () => {
        await signOut(auth);
        window.location.replace("index.html");
      });
    }
  }
});
