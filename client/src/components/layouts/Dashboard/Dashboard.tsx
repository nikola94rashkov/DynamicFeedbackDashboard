import {useGetFeedbacksByUserIdQuery} from "@/store/feedback/feedbackApiSlice.ts";

export const Dashboard = () => {
    const { data, isError } = useGetFeedbacksByUserIdQuery({
        page: 1,
        limit: 10,
        userId: '68541729108ece485f300c97'
    });

    console.log('data', data)
    console.log('isError', isError)

    return <h1>Dashboard</h1>
}