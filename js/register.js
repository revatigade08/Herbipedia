import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

console.log("Register JS connected");

if (auth) {
    console.log("Auth loaded successfully");
} else {
    console.log("Auth NOT loaded");
}
