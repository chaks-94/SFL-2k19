import firebase from "firebase";
import config from "../config/config"

firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase;