// store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.isAuthenticated = true;
            })
            .addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.isAuthenticated = true;
            })
            .addMatcher(authApi.endpoints.oauthLogin.matchFulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.isAuthenticated = true;
            })
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
