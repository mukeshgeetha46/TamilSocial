import { api } from "./baseApi";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/comments?targetId=&targetType=&page=&limit=
        getComments: builder.query({
            query: ({ targetId, targetType, page = 1, limit = 20 }) =>
                `/comments?targetId=${targetId}&targetType=${targetType}&page=${page}&limit=${limit}`,
            providesTags: (result, error, { targetId }) => [{ type: "Comment", id: targetId }],
        }),

        // POST /api/comments
        addComment: builder.mutation({
            query: (body) => ({
                url: "/comments",
                method: "POST",
                body,
                // body: { targetId, targetType: "post"|"reel", body, parentId?, mentions? }
            }),
            invalidatesTags: (result, error, { targetId }) => [{ type: "Comment", id: targetId }],
        }),

        // PUT /api/comments/:commentId
        updateComment: builder.mutation({
            query: ({ commentId, body }) => ({
                url: `/comments/${commentId}`,
                method: "PUT",
                body: { body },
            }),
            invalidatesTags: (result, error, { commentId }) => [{ type: "Comment", id: commentId }],
        }),

        // DELETE /api/comments/:commentId
        deleteComment: builder.mutation({
            query: (commentId) => ({ url: `/comments/${commentId}`, method: "DELETE" }),
            invalidatesTags: ["Comment"],
        }),

        // GET /api/comments/:commentId/replies
        getCommentReplies: builder.query({
            query: ({ commentId, page = 1, limit = 10 }) =>
                `/comments/${commentId}/replies?page=${page}&limit=${limit}`,
            providesTags: (result, error, { commentId }) => [{ type: "Comment", id: `replies-${commentId}` }],
        }),

        // GET /api/comments/:commentId/likes
        getCommentLikes: builder.query({
            query: ({ commentId, page = 1, limit = 20 }) =>
                `/comments/${commentId}/likes?page=${page}&limit=${limit}`,
            providesTags: (result, error, { commentId }) => [{ type: "Like", id: `comment-${commentId}` }],
        }),
    }),
});

export const {
    useGetCommentsQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useGetCommentRepliesQuery,
    useGetCommentLikesQuery,
} = commentApi;

