import 'bootstrap';
import './scss/index.scss';


import { initializeApp } from 'firebase/app';
import { doc, setDoc, getDoc, getFirestore, DocumentReference } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Hufiec, Druzyna } from "./js/Hufiec"


const firebaseConfig = {
  apiKey: "AIzaSyAi0I7GnmubEI2F8WdJCB9tSR1TbnCnETU",
  authDomain: "harc-hufiec.firebaseapp.com",
  projectId: "harc-hufiec",
  storageBucket: "harc-hufiec.appspot.com",
  messagingSenderId: "393576631555",
  appId: "1:393576631555:web:44d56027d120c5aad3ed36"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);
let user = JSON.parse(sessionStorage.getItem("user"));
var loginPanel: HTMLElement | null = null;
var panel: HTMLElement | null = null;
var hufiec: HTMLFormElement | null = null;
var docH: DocumentReference | null = null;

const register = (e: Event) => {
  console.log("register")
  const form: HTMLFormElement = document.forms['login-form']

  createUserWithEmailAndPassword(auth, form["email"].value, form["password"].value)
  .then((userCred) => {
    user = userCred.user
    sessionStorage.setItem("user", JSON.stringify(user))
    showPanel()
  }).catch((error) => {
    document.getElementById("login-info").innerHTML = `${error.message}`
  })
} 

const login = (e: Event) => {
    const form = document.forms["login-form"]
    signInWithEmailAndPassword(auth, form["email"].value, form["password"].value)
    .then((userCredential) => { 
        user = userCredential.user;
        console.log(user)
        sessionStorage.setItem("user", JSON.stringify(user))
        showPanel()
    })
    .catch((error) => {
        document.getElementById("login-info").innerHTML = `${error.message}`
    });
}

const showPanel = () => {
    if(!sessionStorage.getItem("user")) {
        panel.classList.add("none")
        loginPanel.classList.remove("none")
        return;
    }

    panel.classList.remove("none")
    loginPanel.classList.add("none")
    hufiecLoad()
}

const logout = () => {
    user = null;
    sessionStorage.removeItem("user")
    showPanel()
}

const hufiecSave = async () => {
    const formData = new FormData(hufiec);
    // console.log(user)
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    await setDoc(docH, formDataObj);
}

const hufiecLoad = async () => {
  docH = doc(db, "hufiec", user.email)
  const data = await getDoc(docH)
  
  if (data.exists()) {
    hufiecData(data.data() as Hufiec)
  }
}


const hufiecData = (hufiecData: Hufiec) => {
    Object.entries(hufiecData).forEach(([key, value]) => {
        if(Array.isArray(value)) {
            saveDruzyny(key, value);
            return;
        }

        hufiec.elements[key].value = value;
    })
} 

const saveDruzyny = (key: string, value: Druzyna[]) =>  {
    hufiec.elements[key]
}

const createDruzyna = (key: string, value: Druzyna) => {

}

window.onload = () => {
    panel = document.getElementById("panel")
    loginPanel = document.getElementById("loginPanel")
    hufiec = document.getElementById("hufiec-form") as HTMLFormElement

    showPanel()
    document.getElementById("register").addEventListener("click", register)
    document.getElementById("login").addEventListener("click", login)
    document.getElementById("logout").addEventListener("click", logout)
    document.getElementById("hufiec-save").addEventListener("click", hufiecSave)
}
