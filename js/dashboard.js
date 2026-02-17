import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    console.log("Auth state triggered");

    if (user) {
        console.log("User UID:", user.uid);
        console.log("User Email:", user.email);
        document.body.innerHTML += `<h2>Welcome ${user.email}</h2>`;
    } else {
        console.log("No user found");
        window.location.href = "login.html";
    }
});
