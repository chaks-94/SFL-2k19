import FirebaseInstance from "./initializeFirebase";

const AuthenticationService = () => {
    const authInstance = FirebaseInstance.getInstance()
                    .auth();
    
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
        }
    }

}

export default AuthenticationService;