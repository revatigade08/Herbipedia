import { auth, db, storage } from "./firebase-config.js";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const avatarDiv = document.getElementById("profileAvatar");
const bookmarkList = document.getElementById("bookmarkList");
const bookmarkCount = document.getElementById("bookmarkCount");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    const cleanName = data.name.trim();

    document.getElementById("profileName").textContent = cleanName;
    document.getElementById("profileUsername").textContent = "@" + data.username;
    document.getElementById("profileEmail").textContent = data.email;
    document.getElementById("profileDob").textContent = data.dob;
    document.getElementById("profileContact").textContent = data.contact;
    document.getElementById("profileGender").textContent = data.gender;
    document.getElementById("profileCreated").textContent =
      data.createdAt.toDate().toLocaleDateString();

    if (data.photoURL) {
      avatarDiv.innerHTML = `<img src="${data.photoURL}" />`;
    } else {
      avatarDiv.textContent = cleanName.charAt(0).toUpperCase();
    }
  }

  loadBookmarks(user.uid);
});

async function loadBookmarks(uid) {
  const bookmarksRef = collection(db, "users", uid, "bookmarks");
  const snap = await getDocs(bookmarksRef);

  bookmarkList.innerHTML = "";
  bookmarkCount.textContent = snap.size;

  snap.forEach((docSnap) => {
    const plant = docSnap.data();
    const id = docSnap.id;

    bookmarkList.innerHTML += `
      <div class="bookmark-card">
        <div>
          <h4>${plant.name}</h4>
          <p>${plant.description || ""}</p>
        </div>
        <button class="remove-btn" onclick="removeBookmark('${id}')">Remove</button>
      </div>
    `;
  });
}

window.removeBookmark = async function(id) {
  const user = auth.currentUser;
  await deleteDoc(doc(db, "users", user.uid, "bookmarks", id));
  loadBookmarks(user.uid);
};

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

document.getElementById("editProfileBtn").addEventListener("click", async () => {
  const newName = prompt("Enter new name:");
  if (!newName) return;

  const user = auth.currentUser;
  await updateDoc(doc(db, "users", user.uid), {
    name: newName.trim()
  });

  location.reload();
});

document.getElementById("uploadImageBtn").addEventListener("click", () => {
  document.getElementById("profileImageInput").click();
});

document.getElementById("profileImageInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const user = auth.currentUser;

  const storageRef = ref(storage, "profileImages/" + user.uid);
  await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(storageRef);

  await updateDoc(doc(db, "users", user.uid), {
    photoURL: downloadURL
  });

  location.reload();
});
