let firebaseConfig = {
    apiKey: "AIzaSyClvFF6oCPIUBbge147PYKkw2DK9Ql2RMc",
    authDomain: "blogging-platform-be9bb.firebaseapp.com",
    projectId: "blogging-platform-be9bb",
    storageBucket: "blogging-platform-be9bb.firebasestorage.app",
    messagingSenderId: "762371490651",
    appId: "1:762371490651:web:1c506de5245bdaea17507e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let auth = firebase.auth();

const logoutUser = () =>{
    auth.signOut();
    location.reload();
}