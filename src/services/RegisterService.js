import firebase from "firebase";
import config from "../config/config"

const RegisterService = (object) => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    return firebase.database()
            .ref("/sfl2k19")
            .push(object)
            .then(() => {
                return "success";
            })
}

export default RegisterService;



