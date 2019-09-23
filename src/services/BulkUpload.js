import { UploadFile } from "./uploadService";

const BulkUpload = (files) => {
    let promises = [];
    return new Promise((resolve, reject) => {
        files.forEach((file) => {
            console.log(file.newName);
            promises.push(
                new Promise((resolve) => {
                    UploadFile(`/gallery/${file.newName}.jpg`,file)
                        .then((message) => {
                            resolve(message);
                        })
                })
            )
        });
        console.log(promises);
        Promise.all(promises)
            .then((messages) => {
                resolve(messages)
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export default BulkUpload;