import FirebaseInstance from "./initializeFirebase";
import { Promise } from "q";

const GetPlayers = () => {
    return new Promise((resolve,reject) => {
        let players;
        const playersRef = FirebaseInstance.getInstance()
            .database()
            .ref("/sfl2k19");
        return playersRef.on('value',(snapshot) => {
            players = snapshot.val();
            resolve(players);
        })
    })
}
export default GetPlayers;