import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const app = initializeApp({
  apiKey: "AIzaSyB5F7Z_UllDHC3Ym2SSGEZF67giHc9xE9Y",
  authDomain: "podcastweb-1c76a.firebaseapp.com",
  projectId: "podcastweb-1c76a",
  storageBucket: "podcastweb-1c76a.appspot.com",
  messagingSenderId: "819262810424",
  appId: "1:819262810424:web:eee74c6fc252871b5bf9cd"
});

export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()
export const storage = getStorage(app)