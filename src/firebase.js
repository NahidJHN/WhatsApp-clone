import { initializeApp  } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider,getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAg4K0-3cZ7MajzTNJfEiZHiOH5mRw9oVw",
    authDomain: "whatsapp-clone-22adb.firebaseapp.com",
    projectId: "whatsapp-clone-22adb",
    storageBucket: "whatsapp-clone-22adb.appspot.com",
    messagingSenderId: "366563934900",
    appId: "1:366563934900:web:e6d1558508909f727e4de1"

};

const app=initializeApp(firebaseConfig)
const db = getFirestore(app)
const gAuth = new GoogleAuthProvider(app)
const GetAuth=getAuth(app)



export default db
export {app,gAuth,GetAuth}