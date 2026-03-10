export const exploreApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/explore?category=&page=&limit=
        exploreGrid: builder.query({
            query: ({ category, page = 1, limit = 24 } = {}) => {
                const params = new URLSearchParams({ page, limit });
                if (category) params.set("category", category);
                return `/explore?${params}`;
            },
            providesTags: ["Explore"],
        }),

        // GET /api/explore/hashtags?q=&limit=
        searchHashtags: builder.query({
            query: ({ q = "", limit = 10 } = {}) =>
                `/explore/hashtags?q=${encodeURIComponent(q)}&limit=${limit}`,
            providesTags: ["Explore"],
        }),

        // GET /api/explore/hashtags/:tag?page=&limit=
        getHashtagPosts: builder.query({
            query: ({ tag, page = 1, limit = 18 }) =>
                `/explore/hashtags/${encodeURIComponent(tag)}?page=${page}&limit=${limit}`,
            providesTags: (result, error, { tag }) => [{ type: "Explore", id: tag }],
        }),
    }),
});

export const {
    useExploreGridQuery,
    useSearchHashtagsQuery,
    useGetHashtagPostsQuery,
} = exploreApi;
