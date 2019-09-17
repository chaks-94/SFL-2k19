import firebase from "firebase";
import config from "../config/config"

const FirebaseInstance = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    return {
        getInstance: () =>{
            return firebase;
        }
    }
}

export default FirebaseInstance();