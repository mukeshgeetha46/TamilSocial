import * as SecureStore from "expo-secure-store";
import { api } from "./baseApi";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        overrideExisting: true,
        // POST /api/auth/register
        register: builder.mutation({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body, // { fullName, username, email, password }
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await SecureStore.setItemAsync("accessToken", data.accessToken);
                    await SecureStore.setItemAsync("refreshToken", data.refreshToken);
                    await SecureStore.setItemAsync("user", JSON.stringify(data.user));
                } catch { }
            },
            invalidatesTags: ["Auth"],
        }),

        // POST /api/auth/login
        login: builder.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body, // { email, password }
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await SecureStore.setItemAsync("accessToken", data.accessToken);
                    await SecureStore.setItemAsync("refreshToken", data.refreshToken);
                    await SecureStore.setItemAsync("user", JSON.stringify(data.user));
                } catch { }
            },
            invalidatesTags: ["Auth"],
        }),

        // POST /api/auth/oauth
        oauthLogin: builder.mutation({
            query: (body) => ({
                url: "/auth/oauth",
                method: "POST",
                body, // { provider: "google"|"facebook", token }
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await SecureStore.setItemAsync("accessToken", data.accessToken);
                    await SecureStore.setItemAsync("refreshToken", data.refreshToken);
                    await SecureStore.setItemAsync("user", JSON.stringify(data.user));
                } catch { }
            },
        }),

        // POST /api/auth/logout
        logout: builder.mutation({
            query: () => ({ url: "/auth/logout", method: "POST" }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } finally {
                    await SecureStore.deleteItemAsync("accessToken");
                    await SecureStore.deleteItemAsync("refreshToken");
                    await SecureStore.deleteItemAsync("user");
                }
            },
            invalidatesTags: ["Auth", "Feed", "User"],
        }),

        // POST /api/auth/forgot-password
        forgotPassword: builder.mutation({
            query: (body) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body, // { email }
            }),
        }),

        // POST /api/auth/reset-password
        resetPassword: builder.mutation({
            query: (body) => ({
                url: "/auth/reset-password",
                method: "POST",
                body, // { token, newPassword }
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useOauthLoginMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
