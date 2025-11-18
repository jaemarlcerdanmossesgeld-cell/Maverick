/*VERY SENSITIVE INFORMATION, Please don't share it to anyone, as it is my database key :))*/
const firebaseConfig = {
  apiKey: "AIzaSyBFTfKBJUX8R7rLRIen6unGeIwIFsEIKGo",
  authDomain: "maverick-8834a.firebaseapp.com",
  projectId: "maverick-8834a",
  storageBucket: "maverick-8834a.firebasestorage.app",
  messagingSenderId: "988149394128",
  appId: "1:988149394128:web:77aa4f752a7bfc383e8cd5",
  measurementId: "G-7H8LPM9K44"
};



//FIREBASE INITIALIZATION
window.firebase = {
  app: null, auth: null, db: null, storage: null, appId: firebaseConfig.appId,
  firestore: { getFirestore: null, collection: null, addDoc: null, serverTimestamp: null, doc: null, getDoc: null, onSnapshot: null, query: null, where: null, updateDoc: null, },
  authFunctions: { createUserWithEmailAndPassword: null, signInWithEmailAndPassword: null },
  resolver: null, rejecter: null   
};

window.firebase.ready = new Promise((resolve, reject) => {
  window.firebase.resolver = resolve;
  window.firebase.rejecter = reject;
});

async function initializeFirebase() {
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
    const { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js');
    const { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, onSnapshot, query, where, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');
    const { getStorage } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js');
    
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("PASTE_")) {
      console.error("Firebase config is empty. Initialization failed.");
      window.firebase.rejecter("Firebase config is empty."); 
      return;
    }

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    
    window.firebase.app = app; window.firebase.auth = auth; window.firebase.db = db; window.firebase.storage = storage;
    window.firebase.firestore = { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, onSnapshot, query, where, updateDoc };
    window.firebase.authFunctions = { createUserWithEmailAndPassword, signInWithEmailAndPassword };
    
    console.log("Firebase Initialized");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.uid, user.email || "Anonymous");
        updateUserIcon(user);
        addSignOutButton(auth, signOut);
      } else {
        console.log("User is signed out.");
        updateUserIcon(null);
        removeSignOutButton();
      }
    });
    window.firebase.resolver({ auth, db, storage, appId: window.firebase.appId });

  } catch (error) {
    console.error("Firebase initialization failed:", error);
    window.firebase.rejecter(error); 
  }
}

function updateUserIcon(user) {
  const userIconLink = document.querySelector("a[href*='login.html'], a[href*='admin-dashboard.html'], a[href*='user-dashboard.html']");
  if (!userIconLink) return;
  
  if (user) {
    if (user.email === "admin@maverick.com") {
      userIconLink.href = "admin-dashboard.html";
    } else {
      userIconLink.href = "index.html";
    }
  } else {
    userIconLink.href = "login.html";
  }
}

function addSignOutButton(auth, signOut) {
  const headerIcons = document.querySelector(".header-icons");
  if (!headerIcons || document.getElementById("sign-out-btn")) {
    return;
  }
  
  const signOutLink = document.createElement("a");
  signOutLink.href = "#"; signOutLink.id = "sign-out-btn";
  signOutLink.className = "icon-link"; signOutLink.textContent = "Sign Out";
  
  signOutLink.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      console.log("User signed out.");
      window.location.href = "index.html";
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  });
  headerIcons.appendChild(signOutLink);
}

function removeSignOutButton() {
  const signOutBtn = document.getElementById("sign-out-btn");
  if (signOutBtn) {
    signOutBtn.remove();
  }
}

initializeFirebase();


//Card & Options Code
const cards = document.querySelectorAll(".card");
const allOptions = document.querySelectorAll(".options-set");
const container = document.querySelector(".container");
let filtered = false;

if (container) {
  const cardStyles = window.getComputedStyle(cards[0]);
  const cardWidth = cardStyles.width;
  const cardPadding = cardStyles.padding;
  const cardBorder = cardStyles.borderWidth;
  const containerStyles = window.getComputedStyle(container);
  const containerGap = containerStyles.gap;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const brand = card.dataset.brand;
      const optionsToShow = document.getElementById(brand + "-options");

      if (!filtered) {
        container.classList.add("is-filtered");
        container.style.gap = "30px";
        cards.forEach((c) => {
          c.style.transition = "all 0.6s ease"; 
          if (c !== card) {
            c.style.opacity = "0"; c.style.width = "0px"; c.style.padding = "0px"; c.style.borderWidth = "0px"; c.style.margin = "0px";
          } else { c.style.opacity = "1"; }
        });
        if (optionsToShow) { optionsToShow.style.display = "flex"; }
        filtered = true;
      } else {
        container.classList.remove("is-filtered");
        container.style.gap = containerGap;
        cards.forEach((c) => {
          c.style.transition = "all 0.6s ease"; c.style.transform = "translateX(0)"; 
          c.style.opacity = "1"; c.style.width = cardWidth; c.style.padding = cardPadding; c.style.borderWidth = cardBorder; c.style.margin = "";
        });
        allOptions.forEach((opt) => { opt.style.display = "none"; });
        filtered = false;
      }
    });
  });
}

//Page Transition Code 
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a, .logo a");
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.endsWith('.html') || href === "index.html")) { 
      link.addEventListener("click", (event) => {
        if (window.location.pathname.endsWith(href)) return;
        event.preventDefault(); 
        const destinationURL = link.href;
        document.body.classList.add("page-fade-out");
        setTimeout(() => { window.location.href = destinationURL; }, 500);
      });
    }
  });
  
  //MAP MODAL JAVASCRIPT (STILL IN PROGRESS)
  const showMapBtn = document.getElementById("show-map-btn");
  const closeMapBtn = document.getElementById("close-map-btn");
  const mapModal = document.getElementById("map-modal");
  if (showMapBtn) {
    showMapBtn.addEventListener("click", (e) => {
      e.preventDefault(); 
      if (mapModal) { mapModal.style.display = "flex"; }
    });
  }
  if (closeMapBtn) {
    closeMapBtn.addEventListener("click", () => {
      if (mapModal) { mapModal.style.display = "none"; }
    });
  }
});