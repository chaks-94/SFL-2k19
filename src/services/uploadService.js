import FirebaseInstance from "./initializeFirebase";
import "@firebase/storage";

export const UploadFile =  (fileName,fileData) => {
  
    const storage = FirebaseInstance.storage();
    return storage
        .ref(fileName)
        .put(fileData)
        .then(() => {
            return "success";
        })
}