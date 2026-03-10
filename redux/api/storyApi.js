export const storyApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // POST /api/stories
        createStory: builder.mutation({
            query: (body) => ({
                url: "/stories",
                method: "POST",
                body,
                /*
                  body: {
                    mediaUrl, mediaType: "image"|"video",
                    caption?, duration?, musicTrack?,
                    stickers?, mentions?
                  }
                */
            }),
            invalidatesTags: ["Story"],
        }),

        // GET /api/stories/feed
        getStoryFeed: builder.query({
            query: () => "/stories/feed",
            providesTags: ["Story"],
        }),

        // GET /api/stories/:userId
        getUserStories: builder.query({
            query: (userId) => `/stories/${userId}`,
            providesTags: (result, error, userId) => [{ type: "Story", id: userId }],
        }),

        // GET /api/stories/:storyId/viewers
        getStoryViewers: builder.query({
            query: (storyId) => `/stories/${storyId}/viewers`,
            providesTags: (result, error, storyId) => [{ type: "Story", id: `viewers-${storyId}` }],
        }),

        // POST /api/stories/:storyId/view
        viewStory: builder.mutation({
            query: (storyId) => ({
                url: `/stories/${storyId}/view`,
                method: "POST",
            }),
            invalidatesTags: (result, error, storyId) => [{ type: "Story", id: storyId }],
        }),

        // DELETE /api/stories/:storyId
        deleteStory: builder.mutation({
            query: (storyId) => ({ url: `/stories/${storyId}`, method: "DELETE" }),
            invalidatesTags: ["Story"],
        }),
    }),
});

export const {
    useCreateStoryMutation,
    useGetStoryFeedQuery,
    useGetUserStoriesQuery,
    useGetStoryViewersQuery,
    useViewStoryMutation,
    useDeleteStoryMutation,
} = storyApi;

