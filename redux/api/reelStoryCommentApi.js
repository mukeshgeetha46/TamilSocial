// store/api/reelApi.js
import { api } from "./baseApi";

export const reelApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // POST /api/reels
        createReel: builder.mutation({
            query: (body) => ({
                url: "/reels",
                method: "POST",
                body,
                /*
                  body: {
                    videoUrl, thumbnailUrl?, caption?,
                    hashtags?, mentions?, duration,
                    musicTrack?: { title, artist, audioUrl, isOriginalAudio }
                  }
                */
            }),
            invalidatesTags: ["Reel", "Feed"],
        }),

        // GET /api/reels/:reelId
        getReel: builder.query({
            query: (reelId) => `/reels/${reelId}`,
            providesTags: (result, error, reelId) => [{ type: "Reel", id: reelId }],
        }),

        // PUT /api/reels/:reelId
        updateReel: builder.mutation({
            query: ({ reelId, ...body }) => ({
                url: `/reels/${reelId}`,
                method: "PUT",
                body, // { caption?, hashtags?, mentions?, musicTrack? }
            }),
            invalidatesTags: (result, error, { reelId }) => [{ type: "Reel", id: reelId }],
        }),

        // DELETE /api/reels/:reelId
        deleteReel: builder.mutation({
            query: (reelId) => ({ url: `/reels/${reelId}`, method: "DELETE" }),
            invalidatesTags: (result, error, reelId) => [{ type: "Reel", id: reelId }, "Feed"],
        }),

        // GET /api/reels/:reelId/likes
        getReelLikes: builder.query({
            query: ({ reelId, page = 1, limit = 20 }) =>
                `/reels/${reelId}/likes?page=${page}&limit=${limit}`,
            providesTags: (result, error, { reelId }) => [{ type: "Like", id: `reel-${reelId}` }],
        }),
    }),
});

export const {
    useCreateReelMutation,
    useGetReelQuery,
    useUpdateReelMutation,
    useDeleteReelMutation,
    useGetReelLikesQuery,
} = reelApi;

