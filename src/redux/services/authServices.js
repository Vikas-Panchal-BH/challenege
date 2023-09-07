import { removeToken, setToken, setUser } from "../../redux/slice/authSlice";
import { store } from "../../redux/store";

export const signInService = (data) => {
    const usersFromState = store.getState().user.users;
    const user = usersFromState.find((user) => user.email === data.email);

    if (user && user.password === data.password) {
        store.dispatch(setToken(user));
        store.dispatch(setUser(user));
        return true;
    } else {
        store.dispatch(removeToken(user));
        return false;
    }

    return data;
};

