const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    currentUser: {},
    isAdmin: 0,
    isBasic: 0,
    isSuperAdmin: 0,

}
const authSlice = createSlice({
    name: "auth", initialState,
    reducers: {
        setToken: (state, action) => {
            state.isAdmin = action.payload?.role === 1;
            state.isBasic = action.payload?.role === 2;
            state.isSuperAdmin = action.payload?.role === 0;
        },
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },

        removeToken: (state, action) => {
            state.currentUser = {};
            state.isAdmin = 0;
            state.isBasic = 0;
            state.isSuperAdmin = 0;

        },
    }
})

export const {
    setUser,
    removeToken,
    setToken

} = authSlice.actions;

export default authSlice.reducer;
