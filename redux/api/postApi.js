// store/api/postApi.js
import { api } from "./baseApi";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // POST /api/posts
        createPost: builder.mutation({
            query: (body) => ({
                url: "/posts",
                method: "POST",
                body,
                /*
                  body: {
                    media: [{ url, type: "image"|"video", width?, height?, duration? }],
                    caption?,
                    hashtags?,
                    mentions?,
                    taggedUsers?,
                    location?: { name, latitude, longitude },
                    musicTrack?: { title, artist, audioUrl },
                    crossPostFacebook?, crossPostTwitter?, crossPostTumblr?
                  }
                */
            }),
            invalidatesTags: ["Feed", "Post"],
        }),

        // GET /api/posts/:postId
        getPost: builder.query({
            query: (postId) => `/posts/${postId}`,
            providesTags: (result, error, postId) => [{ type: "Post", id: postId }],
        }),

        // PUT /api/posts/:postId
        updatePost: builder.mutation({
            query: ({ postId, ...body }) => ({
                url: `/posts/${postId}`,
                method: "PUT",
                body,
                // body: { caption?, hashtags?, mentions?, taggedUsers?, location?, musicTrack? }
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: "Post", id: postId }],
        }),

        // DELETE /api/posts/:postId
        deletePost: builder.mutation({
            query: (postId) => ({
                url: `/posts/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, postId) => [
                { type: "Post", id: postId },
                "Feed",
            ],
        }),

        // PUT /api/posts/:postId/archive
        toggleArchivePost: builder.mutation({
            query: ({ postId, archive }) => ({
                url: `/posts/${postId}/archive`,
                method: "PUT",
                body: { archive },
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: "Post", id: postId }, "Feed"],
        }),

        // GET /api/posts/:postId/likes?page=&limit=
        getPostLikes: builder.query({
            query: ({ postId, page = 1, limit = 20 }) =>
                `/posts/${postId}/likes?page=${page}&limit=${limit}`,
            providesTags: (result, error, { postId }) => [{ type: "Like", id: `post-${postId}` }],
        }),
        getAllPost: builder.query({
            query: () =>
                `/posts`,
            providesTags: ["Post"],
        }),
        getAllUserPost: builder.query({
            query: (userId) =>
                `/posts/${userId}`,
            providesTags: ["Post"],
        }),
    }),
});

export const {
    useCreatePostMutation,
    useGetPostQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
    useToggleArchivePostMutation,
    useGetPostLikesQuery,
    useGetAllPostQuery,
    useGetAllUserPostQuery
} = postApi;

