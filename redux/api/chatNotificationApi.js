// store/api/conversationApi.js
import { api } from "./baseApi";

export const conversationApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/conversations
        getInbox: builder.query({
            query: () => "/conversations",
            providesTags: ["Conversation"],
        }),

        // POST /api/conversations  { participantId }
        getOrCreateDM: builder.mutation({
            query: (body) => ({
                url: "/conversations",
                method: "POST",
                body, // { participantId }
            }),
            invalidatesTags: ["Conversation"],
        }),

        // POST /api/conversations/group  { participantIds[], groupName }
        createGroupChat: builder.mutation({
            query: (body) => ({
                url: "/conversations/group",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Conversation"],
        }),

        // GET /api/conversations/:convId
        getConversation: builder.query({
            query: (convId) => `/conversations/${convId}`,
            providesTags: (result, error, convId) => [{ type: "Conversation", id: convId }],
        }),

        // PUT /api/conversations/:convId  { groupName?, groupAvatarUrl? }
        updateConversation: builder.mutation({
            query: ({ convId, ...body }) => ({
                url: `/conversations/${convId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, { convId }) => [{ type: "Conversation", id: convId }],
        }),

        // DELETE /api/conversations/:convId
        leaveConversation: builder.mutation({
            query: (convId) => ({ url: `/conversations/${convId}`, method: "DELETE" }),
            invalidatesTags: ["Conversation"],
        }),
    }),
});

export const {
    useGetInboxQuery,
    useGetOrCreateDMMutation,
    useCreateGroupChatMutation,
    useGetConversationQuery,
    useUpdateConversationMutation,
    useLeaveConversationMutation,
} = conversationApi;
