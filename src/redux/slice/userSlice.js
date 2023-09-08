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

            // console.log("line 38", action.payload);


        },
        createUser: (state, action) => {
            const usersF = [...state.users];
            usersF.push(action.payload);
            state.users = usersF;
            // console.log("line 48", action.payload);
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
            // console.log("line 52", action.payload);
        },
        editUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload?.id);
            const usersF = [...state.users];
            usersF.push(action.payload?.data);
            state.users = usersF;
            // console.log("line 51", action.payload);
        },
        createUserType: (state, action) => {
            const usersF = [...state.type];
            usersF.push(action.payload);
            state.type = usersF;
            console.log("line 61", action.payload);
        },
        deleteType: (state, action) => {
            state.type = state.type.filter((user) => user?.id !== action.payload);
            console.log("line 52", action.payload);
        },
        editType: (state, action) => {
            // state.type = state.type.filter((user) => user?.id !== action.payload?.id);
            // const usersF = [...state.type];
            // usersF.push(action.payload);
            // state.type = usersF;
            console.log("line 52", action.payload);
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
