// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE: store/api/followApi.js
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// store/api/followApi.js
import { api } from "./baseApi";

export const followApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/follows/suggestions?limit=
        getFollowSuggestions: builder.query({
            query: ({ limit = 10 } = {}) => `/follows/suggestions?limit=${limit}`,
            providesTags: ["Follow"],
        }),

        // GET /api/follows/:userId/followers?page=&limit=
        getFollowers: builder.query({
            query: ({ userId, page = 1, limit = 20 }) =>
                `/follows/${userId}/followers?page=${page}&limit=${limit}`,
            providesTags: (result, error, { userId }) => [{ type: "Follow", id: `followers-${userId}` }],
        }),

        // GET /api/follows/:userId/following?page=&limit=
        getFollowing: builder.query({
            query: ({ userId, page = 1, limit = 20 }) =>
                `/follows/${userId}/following?page=${page}&limit=${limit}`,
            providesTags: (result, error, { userId }) => [{ type: "Follow", id: `following-${userId}` }],
        }),

        // POST /api/follows/:userId
        follow: builder.mutation({
            query: (userId) => ({
                url: `/follows/${userId}`,
                method: "POST",
            }),
            invalidatesTags: (result, error, userId) => [
                "Follow",
                { type: "User", id: userId },
                "Feed",
            ],
        }),

        // DELETE /api/follows/:userId
        unfollow: builder.mutation({
            query: (userId) => ({
                url: `/follows/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, userId) => [
                "Follow",
                { type: "User", id: userId },
                "Feed",
            ],
        }),

        // DELETE /api/follows/:userId/remove
        removeFollower: builder.mutation({
            query: (userId) => ({
                url: `/follows/${userId}/remove`,
                method: "DELETE",
            }),
            invalidatesTags: ["Follow", "User"],
        }),
    }),
});

export const {
    useGetFollowSuggestionsQuery,
    useGetFollowersQuery,
    useGetFollowingQuery,
    useFollowMutation,
    useUnfollowMutation,
    useRemoveFollowerMutation,
} = followApi;


