import {useGetAllFeedbacksQuery} from "@/store/feedback/feedbackApiSlice.ts";

export const Home = () => {
    const { data, isLoading, isError } = useGetAllFeedbacksQuery({
        page: 1,
        limit: 10,
        sortBy: 'category',
    })

    console.log('data', data)
    console.log('isLoading', isLoading)
    console.log('isError', isError)

    return <h1>Home</h1>
}