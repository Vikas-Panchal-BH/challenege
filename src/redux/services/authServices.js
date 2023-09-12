import { removeToken, setToken, setUser } from "../../redux/slice/authSlice";
import { store } from "../../redux/store";
import {collection, getDocs, getFirestore, where,query} from "firebase/firestore";

export const signInService = async (data) => {
    try {
        const db = getFirestore();
        const collectionRef = collection(db, "users");

        const q = query(collectionRef, where("email", "==", data?.email), where("password", "==", data?.password));

        const docSnap = await getDocs(q);
        const userData = [];
        docSnap.forEach((doc) => {
            userData.push(doc.data())
        });
        store.dispatch(setToken(userData[0]));
        store.dispatch(setUser(userData[0]))
        return userData?.length > 0;
    } catch (e) {
        console.log("error",e);
    }
};

export const signOutService = () => {
    store.dispatch(removeToken());
};

// Export these functions if needed by other parts of your application.
export default { signInService, signOutService };
