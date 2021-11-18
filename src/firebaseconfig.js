import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC7kfDz2WisdkxLwpI3POqTl6FywbirvUI",
  authDomain: "prueba-react-52708.firebaseapp.com",
  projectId: "prueba-react-52708",
  storageBucket: "prueba-react-52708.appspot.com",
  messagingSenderId: "1058399894840",
  appId: "1:1058399894840:web:e0e555ec69373a928ad5cd",
  measurementId: "G-XK202T83DE"
};

const fire = firebase.initializeApp(firebaseConfig);
const store = fire.firestore()

export { store }