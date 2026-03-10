export const notificationApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/notifications?page=&limit=
        getNotifications: builder.query({
            query: ({ page = 1, limit = 20 } = {}) =>
                `/notifications?page=${page}&limit=${limit}`,
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCache, newItems) => {
                currentCache.notifications.push(...newItems.notifications);
            },
            forceRefetch: ({ currentArg, previousArg }) =>
                currentArg?.page !== previousArg?.page,
            providesTags: ["Notification"],
        }),

        // GET /api/notifications/unread-count
        getUnreadNotificationCount: builder.query({
            query: () => "/notifications/unread-count",
            providesTags: ["Notification"],
        }),

        // PUT /api/notifications/:id/read
        markNotificationRead: builder.mutation({
            query: (id) => ({ url: `/notifications/${id}/read`, method: "PUT" }),
            invalidatesTags: ["Notification"],
        }),

        // PUT /api/notifications/read-all
        markAllNotificationsRead: builder.mutation({
            query: () => ({ url: "/notifications/read-all", method: "PUT" }),
            invalidatesTags: ["Notification"],
        }),

        // DELETE /api/notifications/:id
        deleteNotification: builder.mutation({
            query: (id) => ({ url: `/notifications/${id}`, method: "DELETE" }),
            invalidatesTags: ["Notification"],
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useGetUnreadNotificationCountQuery,
    useMarkNotificationReadMutation,
    useMarkAllNotificationsReadMutation,
    useDeleteNotificationMutation,
} = notificationApi;

