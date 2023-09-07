import { removeToken, setToken, setUser } from "../../redux/slice/authSlice";
import { store } from "../../redux/store";

export const signInService = (data) => {
    const usersFromState = store.getState().user.users;
    const user = usersFromState.find((user) => user.email === data.email);

    if (user && user.password === data.password) {
        console.log('Email and password match.');
        store.dispatch(setToken(user));
        store.dispatch(setUser(user));
    } else {
        console.log('Email and/or password do not match.');
        store.dispatch(removeToken(user));
    }

    return data;
};

