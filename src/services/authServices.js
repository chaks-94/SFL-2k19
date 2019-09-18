import FirebaseInstance from "./initializeFirebase";

const AuthenticationService = () => {
    const firebaseInstance = FirebaseInstance.getInstance();
    const authInstance = firebaseInstance.auth();
    
    return {
        signin: (email,password) => {
            return new Promise((resolve,reject) => {
                authInstance
                    .signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        resolve(user);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            }) 
        },
        signOut: () => {
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
                    resolve(admins[user.user.uid]);
                })
            })
        }
    }

}

export default AuthenticationService;