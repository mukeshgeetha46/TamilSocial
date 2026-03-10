// store/api/likeApi.js
import { api } from "./baseApi";

export const likeApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // POST /api/likes  { targetId, targetType: "post"|"reel"|"comment" }
        like: builder.mutation({
            query: (body) => ({ url: "/likes", method: "POST", body }),
            invalidatesTags: (result, error, { targetId, targetType }) => [
                { type: "Like", id: `${targetType}-${targetId}` },
                { type: "Post", id: targetId },
                { type: "Reel", id: targetId },
            ],
        }),

        // DELETE /api/likes  { targetId, targetType }
        unlike: builder.mutation({
            query: (body) => ({ url: "/likes", method: "DELETE", body }),
            invalidatesTags: (result, error, { targetId, targetType }) => [
                { type: "Like", id: `${targetType}-${targetId}` },
                { type: "Post", id: targetId },
                { type: "Reel", id: targetId },
            ],
        }),
    }),
});

export const { useLikeMutation, useUnlikeMutation } = likeApi;

