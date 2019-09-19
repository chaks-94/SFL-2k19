import FirebaseInstance from "./initializeFirebase";

const RegisterService = (object) => {
    
    return FirebaseInstance.database()
            .ref("/sfl2k19")
            .push(object)
            .then(() => {
                return "success";
            })
}

export default RegisterService;



