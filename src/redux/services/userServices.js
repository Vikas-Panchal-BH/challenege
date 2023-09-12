import {
    setUser,
    createUser,
    deleteUser,
    editUser,
    createUserType,
    deleteType,
    editType,
    setTypes
} from "../../redux/slice/userSlice";
import { store } from "../../redux/store";
import {addDoc, collection, doc, getDoc, getDocs,setDoc,deleteDoc,query,where} from "firebase/firestore";
import {db} from "../../firebase";


export const createuserService = async (data) => {

    const usersCollectionRef = collection(db, "users");

    try {
        const user = await addDoc(usersCollectionRef, data);
        const docRef = doc(db, "users", user.id);
        const docSnap = await getDoc(docRef);
        store.dispatch(createUser({ ...docSnap.data(), id: docSnap.id }));
        return true;
    } catch (error) {
        console.error("Error creating user:", error);
       return false
    }
};
export const getUserService = async () => {
    const auth = store.getState((state) => state.auth);
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("email", "!=",auth.currentUser?.email || "" ));
    try {
        const querySnapshot = await getDocs(q);
        const users =[]
        querySnapshot.forEach((doc) => users.push({...doc.data(),id: doc.id}));
        store.dispatch(setUser(users))
    } catch (error) {
        console.error("Error getting documents:", error);
    }
};
export const deleteUserService = async (id) => {
    const docRef = doc(db, "users", id);

    try {
        await deleteDoc(docRef);
        store.dispatch(deleteUser(id))
        return true
    } catch (error) {
        console.error("Error deleting document:", error);
        return false
    }

};
export const editUserService = async (data, id) => {
    const docRef = doc(db, "users", id);

    try {
        await setDoc(docRef, data, { merge: true });
        store.dispatch(editUser({ id, data }))
        return true
    } catch (error) {
        console.error("Error updating document:", error);
        return false
    }

};
export const typeUserService = async (data) => {
    try {
        const typeCollectionRef = collection(db, "type");
        const type = await addDoc(typeCollectionRef, data);
        const docRef = doc(db, "type", type.id);
        const docSnap = await getDoc(docRef);
        store.dispatch(createUserType({...docSnap.data(),id:docSnap.id}))
        return true
    }catch (e) {
        console.log("Error",e);
        return false
    }
};
export const deletTypeService = async (id) => {

    const docRef = doc(db, "type", id);

    try {
        await deleteDoc(docRef);
        store.dispatch(deleteType(id))
        return true
    } catch (error) {
        console.error("Error deleting document:", error);
        return false
    }


};

export const getTypeService = async () => {
    const collectionRef = collection(db, "type")
    try {
        const querySnapshot = await getDocs(collectionRef);
         const types =[]
        querySnapshot.forEach((doc) => types.push({...doc.data(),id: doc.id}));
        store.dispatch(setTypes(types))
    } catch (error) {
        console.error("Error getting documents:", error);
    }

};
export const editTypeService = async (data, id) => {
    const docRef = doc(db, "type", id);

    try {
        await setDoc(docRef, data, { merge: true });
        store.dispatch(editType({ data, id }))
        return true
    } catch (error) {
        console.error("Error updating document:", error);
        return false
    }

};