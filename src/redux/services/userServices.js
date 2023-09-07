import { setUser, createUser, deleteUser, editUser, createUserType } from "../../redux/slice/userSlice";
import { store } from "../../redux/store";

export const userService = (data) => {
    // console.log("services", data)
    store.dispatch(createUser(data));

};
export const getUserService = () => {
    store.dispatch(setUser())

};
export const deleteUserService = (id) => {

    store.dispatch(deleteUser(id))

};
export const editUserService = (data, id) => {

    let data1 = { id, data }
    console.log("editservices", data1)
    store.dispatch(editUser(data1))

};
export const typeUserService = (data) => {
    store.dispatch(createUserType(data))
};