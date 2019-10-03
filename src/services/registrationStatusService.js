import FirebaseInstance from "./initializeFirebase";

const RegistrationStatusService = (object) => {
    return new Promise((resolve,reject) => {
        let regStatus;
        const regStatusRef = FirebaseInstance.database()
            .ref("/regInfo");
        return regStatusRef.on('value', (snapshot) => {
            regStatus = snapshot.val();
            resolve(regStatus.registrationOpenStatus)
        })
    })
}

export default RegistrationStatusService;