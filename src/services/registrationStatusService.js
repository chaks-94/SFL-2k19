import FirebaseInstance from "./initializeFirebase";

const RegistrationStatusService = (object) => {
    return {
        getStatus: () => {
            return new Promise((resolve,reject) => {
                let regStatus;
                const regStatusRef = FirebaseInstance.database()
                    .ref("/regInfo");
                return regStatusRef.on('value', (snapshot) => {
                    regStatus = snapshot.val();
                    resolve(regStatus.registrationOpenStatus)
                })
            })
        },
        setStatus: (status) => {
            console.log(status);
            return FirebaseInstance.database()
            .ref(`/regInfo/registrationOpenStatus`)
            .set(status)
            .then(() => {
                return "success";
            })
            .catch((error) =>{
                return error;
            })
        }
    }
}

export default RegistrationStatusService;