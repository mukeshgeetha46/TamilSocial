// store/api/userApi.js
import { api } from "./baseApi";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/users/search?q=&page=&limit=
        searchUsers: builder.query({
            query: ({ q = "", page = 1, limit = 20 } = {}) =>
                `/users/search?q=${q}&page=${page}&limit=${limit}`,
            providesTags: ["User"],
        }),

        // GET /api/users/:username
        getUserProfile: builder.query({
            query: (username) => `/users/${username}`,
            providesTags: (result, error, username) => [{ type: "User", id: username }],
        }),

        // GET /api/users/:username/posts?page=&limit=
        getUserPosts: builder.query({
            query: ({ username, page = 1, limit = 12 }) =>
                `/users/${username}/posts?page=${page}&limit=${limit}`,
            providesTags: (result, error, { username }) => [{ type: "Post", id: `user-${username}` }],
        }),

        // GET /api/users/:username/reels?page=&limit=
        getUserReels: builder.query({
            query: ({ username, page = 1, limit = 12 }) =>
                `/users/${username}/reels?page=${page}&limit=${limit}`,
            providesTags: (result, error, { username }) => [{ type: "Reel", id: `user-${username}` }],
        }),

        // GET /api/users/:username/tagged?page=&limit=
        getTaggedPosts: builder.query({
            query: ({ username, page = 1, limit = 12 }) =>
                `/users/${username}/tagged?page=${page}&limit=${limit}`,
            providesTags: (result, error, { username }) => [{ type: "Post", id: `tagged-${username}` }],
        }),

        // PUT /api/users/me
        updateProfile: builder.mutation({
            query: (body) => ({
                url: "/users/me",
                method: "PUT",
                body,
                // body: { fullName?, username?, bio?, website?, location?, avatarUrl?, phone?, gender? }
            }),
            invalidatesTags: ["User"],
        }),

        // PUT /api/users/me/settings
        updateSettings: builder.mutation({
            query: (body) => ({
                url: "/users/me/settings",
                method: "PUT",
                body,
                // body: { darkMode?, notificationsEnabled?, isPrivate? }
            }),
            invalidatesTags: ["User"],
        }),

        // PUT /api/users/me/account-type
        switchAccountType: builder.mutation({
            query: (body) => ({
                url: "/users/me/account-type",
                method: "PUT",
                body, // { isProfessional: true|false }
            }),
            invalidatesTags: ["User"],
        }),

        // DELETE /api/users/me
        deleteAccount: builder.mutation({
            query: () => ({ url: "/users/me", method: "DELETE" }),
            invalidatesTags: ["User", "Auth"],
        }),
    }),
});

export const {
    useSearchUsersQuery,
    useGetUserProfileQuery,
    useGetUserPostsQuery,
    useGetUserReelsQuery,
    useGetTaggedPostsQuery,
    useUpdateProfileMutation,
    useUpdateSettingsMutation,
    useSwitchAccountTypeMutation,
    useDeleteAccountMutation,
} = userApi;
