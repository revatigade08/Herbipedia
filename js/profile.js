import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const avatar = document.getElementById("avatar");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const data = snap.data();

    userName.textContent = data.name;
    userEmail.textContent = data.email;
    document.getElementById("username").textContent = data.username;
    document.getElementById("contact").textContent = data.contact;
    document.getElementById("dob").textContent = data.dob;
    document.getElementById("gender").textContent = data.gender;

    const created = data.createdAt?.toDate();
    document.getElementById("createdAt").textContent =
      created ? created.toDateString() : "";

    avatar.textContent = data.name.charAt(0).toUpperCase();
    avatar.style.background = generateColor(data.name);
  }

  loadBookmarks(user.uid);
});

async function loadBookmarks(uid) {

  const bookmarkRef = collection(db, "users", uid, "bookmarks");
  const querySnapshot = await getDocs(bookmarkRef);

  const grid = document.getElementById("bookmarkGrid");
  grid.innerHTML = "";

  if (querySnapshot.empty) {
    grid.innerHTML = `<div class="empty-state">
      No bookmarks yet 🌿
    </div>`;
    return;
  }

  querySnapshot.forEach(docSnap => {

    const data = docSnap.data();

    const card = document.createElement("div");
    card.className = "bookmark-card";

    card.innerHTML = `
      <img src="${data.image}" alt="">
      <p>${data.plantName}</p>
      <button class="remove-btn" data-id="${docSnap.id}">
        Remove
      </button>
    `;

    grid.appendChild(card);
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      await deleteDoc(doc(db, "users", uid, "bookmarks", id));
      loadBookmarks(uid);
    });
  });
}

document.getElementById("editProfile")
.addEventListener("click", async () => {

  const newName = prompt("Enter new name:");
  if (!newName) return;

  const user = auth.currentUser;

  await updateDoc(doc(db, "users", user.uid), {
    name: newName
  });

  alert("Profile Updated!");
  location.reload();
});

function generateColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 60%)`;
}
