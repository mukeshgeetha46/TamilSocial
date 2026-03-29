import { api } from "./baseApi";

export const saveApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/saves?page=&limit=&collection=
        getSavedPosts: builder.query({
            query: ({ page = 1, limit = 12, collection } = {}) => {
                const params = new URLSearchParams({ page, limit });
                if (collection) params.set("collection", collection);
                return `/saves?${params}`;
            },
            providesTags: ["Save"],
        }),

        // POST /api/saves  { postId, collectionName? }
        savePost: builder.mutation({
            query: (body) => ({ url: "/saves", method: "POST", body }),
            invalidatesTags: ["Save", "Post"],
        }),

        // DELETE /api/saves/:postId
        unsavePost: builder.mutation({
            query: (postId) => ({ url: `/saves/${postId}`, method: "DELETE" }),
            invalidatesTags: ["Save", "Post"],
        }),
    }),
});

export const {
    useGetSavedPostsQuery,
    useSavePostMutation,
    useUnsavePostMutation,
} = saveApi;