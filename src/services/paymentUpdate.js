import FirebaseInstance from "./initializeFirebase";

const PaymentUpdate = (uid,field,value) => {
    
    return FirebaseInstance.database()
            .ref(`/sfl2k19/${uid}/${field}`)
            .set(value)
            .then(() => {
                return "success";
            })
            .catch((error) =>{
                return error;
            })
}

export default PaymentUpdate;