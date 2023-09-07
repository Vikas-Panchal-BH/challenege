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
        },
        {
            "id": 2,
            "username": "admin",
            "email": "admin@gmail.com",
            "password": "Brainerhub@123",
            "role": 1,
            "type": [],
        },
        {
            "id": 3,
            "username": "user",
            "email": "user@gmail.com",
            "password": "Brainerhub@123",
            "role": 2,
            "type": [],
        }
    ],
    type: []

}
const userSlice = createSlice({
    name: "user", initialState,
    reducers: {

        setUser: (state, action) => {



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
            usersF.push(String(action.payload?.type));
            state.type = usersF;
            console.log("line 61", action.payload);
        },
        deleteType: (state, action) => {
            console.log(action.payload)

            let indexToDelete = action.payload;

            if (indexToDelete >= 0 && indexToDelete < state.type.length) {
                state.type.splice(indexToDelete, 1);
            }
        },
        editType: (state, action) => {
            // console.log("line no. 75", action.payload?.data?.type)
            const data = action.payload?.data?.type;
            const id = action.payload?.id;
            const updatedType = [...state.type];
            updatedType[id] = data;
            state.type = updatedType;

        }
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
