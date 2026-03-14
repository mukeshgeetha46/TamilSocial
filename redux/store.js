import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/baseApi";
import authReducer from "./authSlice"; // 👈 ADD THIS
import themeReducer from "./themeSlice";

// Import all injected endpoint files
import "./api/authApi";
import "./api/chatNotificationApi";
import "./api/followApi";
import "./api/likesSaveFeedExploreApi";
import "./api/postApi";
import "./api/reelStoryCommentApi";
import "./api/userApi";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer, // 👈 ADD THIS
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
