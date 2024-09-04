import 'bootstrap';
import './scss/index.scss';

import { initializeApp } from 'firebase/app';
import { doc, setDoc, getDoc, getFirestore, DocumentReference, collection, CollectionReference, getDocs, QueryDocumentSnapshot } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createhufiec } from './Helper';

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
var loginPanel = null;
var panel = null;
var hufiec = null;
var hufiecDruz = null;
var docH = null;
var docD = null;

const register = (e) => {
  const form = document.forms['login-form']

  createUserWithEmailAndPassword(auth, form["email"].value, form["password"].value)
  .then((userCred) => {
    user = userCred.user
    sessionStorage.setItem("user", JSON.stringify(user))
    showPanel()
  }).catch((error) => {
    document.getElementById("login-info").innerHTML = `${error.message}`
  })
} 

const login = (e) => {
    const form = document.forms["login-form"]
    signInWithEmailAndPassword(auth, form["email"].value, form["password"].value)
    .then((userCredential) => { 
        user = userCredential.user;
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
    const formDataObj = {};
    const druzyny = new Map();
    formData.forEach((value, key) => {

      if(key.startsWith('druzyna')) {
        var ind = key.replace('druzyna[', '')
        ind = ind.replace(/].*/, '')
        var nk = key.replace(/druzyna\[\d+\]./, '')
        if(nk.startsWith('harcerze')) {
          var ind2 = nk.replace('harcerze[', '')
          ind2 = ind2.replace(/].*/, '')
          var nk2 = nk.replace(/.*\./, '')
          
          try {
            if(druzyny.get(ind)?.['harcerze']?.[ind2] !== undefined) {
              druzyny.get(ind).harcerze[ind2][nk2] = value  
            } else {
              if(druzyny.get(ind)) {
                if(druzyny.get(ind)['harcerze'] === undefined) {
                  druzyny.get(ind)['harcerze'] = []
                }
              
              } else {
                  druzyny.set(ind, {['harcerze']: []})
              }

              druzyny.get(ind).harcerze[ind2] = {[nk2]: value}
            }
          }
          catch(e) {}

        } else {
          if(druzyny.get(ind)) {
            druzyny.get(ind)[nk] = value
          } else {
              druzyny.set(ind, {[nk]: value})
          }
        }

        formDataObj.druzyna = Array.from(druzyny.values())
      } else {
        formDataObj[key] = value
      }      
    });
    
    formDataObj.druzyna.forEach(dd => {
      dd.harcerze = Array.from(dd.harcerze ?? [])
      const cc = dd.harcerze.filter(lk => lk != undefined)
      dd.harcerze = cc
    })

    console.log(formDataObj)
    await setDoc(docH, formDataObj);
}

const hufiecLoad = async () => {
  docH = doc(db, "hufiec", user.email)
  docD = collection(db, "hufiec", user.email, "druzyna")
  const data = await getDoc(docH)

  if (data.exists()) {
    const huf = data.data()
    hufiecData(huf)
  }
}

const hufiecData = (hufiecData) => {  
   Object.entries(hufiecData).forEach(([key, value]) => {
        if(Array.isArray(value)) {
            saveDruzyny(key, value);
            return;
        }

        hufiec.elements[key].value = value;
    })
} 

const saveDruzyny = (key, value) =>  {
    for (let i = 0; i < value.length; i++) {
      createhufiec(hufiec, value[i], key, i) 
    }
}

const createDruzInHufiec = () => {
  const length = hufiec.querySelectorAll(".druzyna").length
  createhufiec(hufiec, {name: null, location: null}, 'druzyna', length)
}


window.onload = () => {
    panel = document.getElementById("panel")
    loginPanel = document.getElementById("loginPanel")
    hufiec = document.getElementById("hufiec-form")
    hufiecDruz = document.getElementById("accordionExample")

    showPanel()
    document.getElementById("register").addEventListener("click", register)
    document.getElementById("login").addEventListener("click", login)
    document.getElementById("logout").addEventListener("click", logout)
    document.getElementById("hufiec-save").addEventListener("click", hufiecSave)
    document.getElementById("hufiec-add").addEventListener("click", createDruzInHufiec)
}
