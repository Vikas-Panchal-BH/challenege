const { createSlice } = require("@reduxjs/toolkit");
const initialState = {

    users: [
        {
            "id": 1,
            "username": "superadmin",
            "email": "superadmin@gmail.com",
            "password": "Brainerhub@123",
            "role": 0,
            "type": [],
        }
    ],
    type: [
        {
            id: 1,
            type: "vivek"
        }
    ]

}
const userSlice = createSlice({
    name: "user", initialState,
    reducers: {

        setUser: (state, action) => {



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
            const users = [...state.users, action.payload?.data];
            state.users = users;
        },
        createUserType: (state, action) => {
            const usersF = [...state.type, action.payload];
            state.type = usersF;
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
    editType


} = userSlice.actions;

export default userSlice.reducer;
