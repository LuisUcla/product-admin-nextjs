// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoA3mCpTB-XMPpMM8NSAfnavY77ZrLYJU",
  authDomain: "product-admin-nextjs-tut-8c740.firebaseapp.com",
  projectId: "product-admin-nextjs-tut-8c740",
  storageBucket: "product-admin-nextjs-tut-8c740.firebasestorage.app",
  messagingSenderId: "474181693699",
  appId: "1:474181693699:web:09350405fbef66cb163936"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);

/* ====================== Auth Functions ====================== */


// sign In with email and password
export const signIn= async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw error;
  }
};

// create user with email and password
export const createUser = async (user: { email: string; password: string }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    return userCredential.user;
  } catch (error) {
    console.error("Error creating user with email and password:", error);
    throw error;
  }
};

// update user, this function is used to update the user's
// display name and photo URL after creating a new user
export const updateUser = async (user: {
    displayName?: string | null;
    photoURL?: string | null;
}) => {
  try {
    if (auth.currentUser) return updateProfile(auth.currentUser, user);
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};