import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const publicPages = ["index.html", "login.html", "register.html"];

function isPublicPage() {
  const page = window.location.pathname.split("/").pop();
  return publicPages.includes(page) || page === "";
}

onAuthStateChanged(auth, (user) => {

  // If not logged in and page is protected
  if (!user && !isPublicPage()) {
    window.location.replace("/Herbipedia/index.html");
    return;
  }

  // If logged in and trying to access login/register
  if (user && (window.location.pathname.includes("login.html") ||
               window.location.pathname.includes("register.html"))) {
    window.location.replace("/Herbipedia/about.html"); // change if needed
    return;
  }

  // Show page after auth check
  document.body.style.display = "flex";

  // Add logout button only if logged in
  if (user && !document.getElementById("floatingLogout")) {

    const btn = document.createElement("div");
    btn.id = "floatingLogout";
    btn.innerHTML = `
      <i class="fas fa-home"></i>
      <i class="fas fa-arrow-right"></i>
      <span>Logout</span>
    `;

    Object.assign(btn.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "8px 14px",
      borderRadius: "30px",
      background: "#ffffff",
      color: "#2E7D32",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: "600",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      zIndex: "9999",
      transition: "0.3s"
    });

    btn.addEventListener("mouseenter", () => {
      btn.style.background = "#e8f5e9";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.background = "#ffffff";
    });

    btn.addEventListener("click", async () => {
      await signOut(auth);
      window.location.replace("/Herbipedia/index.html");
    });

    document.body.appendChild(btn);
  }
});
