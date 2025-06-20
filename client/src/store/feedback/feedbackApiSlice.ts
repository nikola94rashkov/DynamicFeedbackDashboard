import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    Feedback,
    FeedbackExtended,
    FeedbackPagination,
    FeedbackList,
    FeedbackFilter, FeedbacksUpdate
} from '@/types/feedback.types.ts'

export const feedbackApiSlice = createApi({
    reducerPath: 'feedbacks',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/feedbacks',
        credentials: 'include',
    }),
    tagTypes: ['Feedbacks'],
    endpoints: (build) => {
        return {
            getAllFeedbacks: build.query<FeedbackList, FeedbackFilter>({
                query: ({ page = 1, limit = 10, category, status, sortBy }) => `?page=${page}&limit=${limit}${category && `&category=${category}`}${status && `&status=${status}`}${sortBy && `&sortBy=${sortBy}`}`,
            }),
            getFeedbacksByUserId: build.query<
                FeedbackList,
                FeedbackPagination & { userId: string }
            >({
                query: ({ page = 1, limit = 10, userId }) =>
                    `/user/${userId}?page=${page}&limit=${limit}`,
            }),
            getFeedbackById: build.query<FeedbackExtended, string | undefined>({
                query: (_id) => `/${_id ?? ''}`,
            }),
            deleteFeedback: build.mutation<void, string>({
                query: (_id) => ({
                    url: `/${_id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: [{ type: 'Feedbacks', id: 'LIST' }],
            }),
            createFeedback: build.mutation<Feedback, FormData>({
                query: (feedback) => ({
                    url: '',
                    method: 'POST',
                    body: feedback,
                }),
                invalidatesTags: [{ type: 'Feedbacks', id: 'LIST' }],
            }),
            updateFeedback: build.mutation<
                Feedback,
                FeedbacksUpdate
            >({
                query: ({ feedback, _id }) => ({
                    url: `/${_id}`,
                    method: 'PUT',
                    body: feedback,
                }),
            }),
        }
    },
})

export const {
    useGetAllFeedbacksQuery,
    useGetFeedbackByIdQuery,
    useGetFeedbacksByUserIdQuery,
    useCreateFeedbackMutation,
    useDeleteFeedbackMutation,
    useUpdateFeedbackMutation,
} = feedbackApiSlice