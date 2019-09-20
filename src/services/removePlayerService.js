import FirebaseInstance from "./initializeFirebase";

const RemovePlayerService = (object) => {
    
    return FirebaseInstance.database()
            .ref(`/sfl2k19/${object.key}`)
            .remove()
            .then(() => {
                return "success";
            })
}

export default RemovePlayerService;