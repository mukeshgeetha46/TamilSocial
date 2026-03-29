import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.3:5000";

// ─────────────────────────────────────────────
// Base query with JWT injection
// ─────────────────────────────────────────────
const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: async (headers) => {
        const token = await SecureStore.getItemAsync("accessToken");
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
    },
});

// ─────────────────────────────────────────────
// Auto-refresh: on 401 → try refresh token → retry
// ─────────────────────────────────────────────
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: "/auth/refresh",
                    method: "POST",
                    body: { refreshToken },
                },
                api,
                extraOptions
            );

            if (refreshResult?.data?.accessToken) {
                await SecureStore.setItemAsync("accessToken", refreshResult.data.accessToken);
                // Retry original request with new token
                result = await baseQuery(args, api, extraOptions);
            } else {
                // Refresh failed — clear tokens and force logout
                await SecureStore.deleteItemAsync("accessToken");
                await SecureStore.deleteItemAsync("refreshToken");
                api.dispatch({ type: "auth/logout" });
            }
        }
    }

    return result;
};

// ─────────────────────────────────────────────
// Root API slice — all endpoints injected from
// their own slice files via injectEndpoints()
// ─────────────────────────────────────────────
export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        "Auth",
        "User",
        "Post",
        "Reel",
        "Story",
        "Comment",
        "Like",
        "Save",
        "Follow",
        "Conversation",
        "Message",
        "Notification",
        "Explore",
        "Feed",
    ],
    endpoints: () => ({}),
});