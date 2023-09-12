const { createSlice } = require("@reduxjs/toolkit");
const initialState = {

    users: [],
    type: []

}
const userSlice = createSlice({
    name: "user", initialState,
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload
        },
        createUser: (state, action) => {
            const users = [...state.users, action.payload];
            state.users = users;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);

        },
        editUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload?.id);
            const users = [...state.users, {id:action.payload?.id,...action.payload?.data}];
            state.users = users;
        },
        setTypes: (state, action) => {
            state.type = action.payload;
        },
        createUserType: (state, action) => {
            const users = [...state.type, action.payload];
            state.type = users;
        },
        deleteType: (state, action) => {
            state.type = state.type.filter((user) => user?.id !== action.payload);
        },
        editType: (state, action) => {
            state.type = state.type.filter((user) => user?.id !== action.payload?.id);
            const users = [...state.type, action.payload?.data];
            state.type = users;

        },

    }
})

export const {
    setUser,
    createUser,
    deleteUser,
    editUser,
    createUserType,
    deleteType,
    editType,
    setTypes

} = userSlice.actions;

export default userSlice.reducer;
