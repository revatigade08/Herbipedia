import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged in user:", user.email);
    } else {
        console.log("No user logged in");
        window.location.href = "login.html";
    }
});
