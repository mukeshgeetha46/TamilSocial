export const messageApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/messages?conversationId=&page=&limit=
        getMessages: builder.query({
            query: ({ conversationId, page = 1, limit = 30 }) =>
                `/messages?conversationId=${conversationId}&page=${page}&limit=${limit}`,
            // Merge pages for infinite scroll (load older messages)
            serializeQueryArgs: ({ queryArgs }) => queryArgs.conversationId,
            merge: (currentCache, newItems) => {
                currentCache.messages.unshift(...newItems.messages);
            },
            forceRefetch: ({ currentArg, previousArg }) =>
                currentArg?.page !== previousArg?.page,
            providesTags: (result, error, { conversationId }) => [
                { type: "Message", id: conversationId },
            ],
        }),

        // POST /api/messages
        sendMessage: builder.mutation({
            query: (body) => ({
                url: "/messages",
                method: "POST",
                body,
                /*
                  body: {
                    conversationId,
                    type: "text"|"image"|"video"|"audio"|"location"|"contact"|"shared_post",
                    body?,
                    mediaUrl?,
                    mediaDuration?,
                    location?: { latitude, longitude, label },
                    sharedPostId?
                  }
                */
            }),
            // Optimistic update: append message immediately
            async onQueryStarted({ conversationId }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        api.util.updateQueryData("getMessages", conversationId, (draft) => {
                            draft.messages.push(data.message);
                        })
                    );
                } catch { }
            },
            invalidatesTags: (result, error, { conversationId }) => [
                { type: "Message", id: conversationId },
                "Conversation",
            ],
        }),

        // DELETE /api/messages/:messageId
        deleteMessage: builder.mutation({
            query: (messageId) => ({ url: `/messages/${messageId}`, method: "DELETE" }),
            invalidatesTags: ["Message"],
        }),

        // PUT /api/messages/:messageId/read
        markMessageRead: builder.mutation({
            query: (messageId) => ({
                url: `/messages/${messageId}/read`,
                method: "PUT",
            }),
            invalidatesTags: ["Message", "Conversation"],
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useSendMessageMutation,
    useDeleteMessageMutation,
    useMarkMessageReadMutation,
} = messageApi;

