import { setUser, createUser, deleteUser, editUser, createUserType, deleteType, editType } from "../../redux/slice/userSlice";
import { store } from "../../redux/store";

export const userService = (data) => {
    store.dispatch(createUser(data));
};
export const getUserService = () => {
    store.dispatch(setUser())
};
export const deleteUserService = (id) => {
    store.dispatch(deleteUser(id))
};
export const editUserService = (data, id) => {
    store.dispatch(editUser({ id, data }))
};
export const typeUserService = (data) => {
    store.dispatch(createUserType(data))
};
export const deletTypeService = (id) => {
    store.dispatch(deleteType(id))
};
export const editTypeService = (data, id) => {

    store.dispatch(editType({ data, id }))
};