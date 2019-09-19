import FirebaseInstance, {auth} from "./initializeFirebase";
import { localValue } from "../helpers/helper";

const AuthenticationService = () => {
    const firebaseInstance = FirebaseInstance;
    const authInstance = auth;
    
    return {
        signin: (email,password) => {
            return new Promise((resolve,reject) => {
                authInstance.setPersistence(firebaseInstance.auth.Auth.Persistence.SESSION)
                    .then(() =>{
                        authInstance
                    .signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        localValue("userToken",user.user.uid);
                        resolve(user);
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    })
            }) 
        },
        signOut: () => {
            console.log("sign out calles");
            return new Promise((resolve) => {
                authInstance
                    .signOut()
                    .then(() => {
                        resolve("success");
                    })

            })
        },
        getUserDetails: (user) => {
            return new Promise((resolve,reject) => {
                const adminRef = firebaseInstance
                                    .database()
                                    .ref("/admins");
                return adminRef.on("value",(snapshot) => {
                    console.log(snapshot.val());
                    const admins = snapshot.val();
                    console.log(admins,user);
                    resolve(admins[user.uid]);
                })
            })
        },
        checkLogin: () => {
           return new Promise((resolve,reject) => {
                authInstance.onAuthStateChanged((user) => {
                    if(user) {
                        resolve(user);
                    } else {
                        reject();
                    }
                })
           })
        }
    }

}

export default AuthenticationService;