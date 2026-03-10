import { api } from "./baseApi";

export const feedApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/feed/home?cursor=&limit=
        getHomeFeed: builder.query({
            query: ({ cursor, limit = 10 } = {}) => {
                const params = new URLSearchParams({ limit });
                if (cursor) params.set("cursor", cursor);
                return `/feed/home?${params}`;
            },

            serializeQueryArgs: ({ endpointName }) => endpointName,

            merge: (currentCache, newItems) => {
                if (!currentCache.posts) {
                    currentCache.posts = newItems.posts;
                } else {
                    currentCache.posts.push(...newItems.posts);
                }

                currentCache.nextCursor = newItems.nextCursor;
            },

            forceRefetch: ({ currentArg, previousArg }) =>
                currentArg?.cursor !== previousArg?.cursor,

            providesTags: ["Feed"],
        }),


        // GET /api/feed/reels?cursor=&limit=
        getReelsFeed: builder.query({
            query: ({ cursor, limit = 5 } = {}) => {
                const params = new URLSearchParams({ limit });
                if (cursor) params.set("cursor", cursor);
                return `/feed/reels?${params}`;
            },
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCache, newItems) => {
                currentCache.reels.push(...newItems.reels);
                currentCache.nextCursor = newItems.nextCursor;
            },
            forceRefetch: ({ currentArg, previousArg }) =>
                currentArg?.cursor !== previousArg?.cursor,
            providesTags: ["Feed"],
        }),
    }),
});

export const {
    useGetHomeFeedQuery,
    useGetReelsFeedQuery,
} = feedApi;

