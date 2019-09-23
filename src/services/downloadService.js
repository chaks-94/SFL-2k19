import FirebaseInstance from "./initializeFirebase";
import "@firebase/storage";
export const DownloadAll =  (fileName,fileData) => {
  
    const storage = FirebaseInstance.storage();
    let promises = [];
    return new Promise((resolve,reject) =>{
        storage
        .ref(`/gallery`)
        .listAll()
        .then((res) => {
                res.items.forEach((item) => {
                    promises.push (
                        new Promise((resolve) =>{
                            item.getDownloadURL()
                                .then((url) => {
                                    resolve(url);
                                })
                        })
                    )
                })
                Promise.all(promises).then(function(values) {
                    resolve(values);
                  });
        })
        .catch((error) => {
            reject(error);
        })
    })    
}







/* item.getDownloadURL()
                        .then((url) => {
                            urlList.push(url);
                        }) */