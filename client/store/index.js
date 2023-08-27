import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    downloads: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducer: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null
        },
        setDownloads: (state) => {
            state.downloads = action.payload.downloads
        }
    }
})

export const { setLogin, setLogout, setDownloads } = authSlice.actions;
export default authSlice.reducer;