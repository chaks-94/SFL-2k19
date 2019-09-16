import firebase from "firebase";
import "@firebase/storage";
import config from "../config/config"

export const UploadFile =  (fileName,fileData) => {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    const storage = firebase.storage();
    return storage
        .ref(fileName)
        .put(fileData)
        .then(() => {
            return "success";
        })
}