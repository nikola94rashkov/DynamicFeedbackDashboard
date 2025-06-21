import {useGetAllFeedbacksQuery} from "@/store/feedback/feedbackApiSlice.ts";
import {CardList} from "@/components/composed";

export const Home = () => {
    const { data, isLoading, isError } = useGetAllFeedbacksQuery({
        page: 1,
        limit: 10,
        sortBy: 'category',
    })

    console.log('data', data)
    console.log('isLoading', isLoading)
    console.log('isError', isError)

    if(isLoading) return <h1>Loading...</h1>;
    if(!data?.feedbacks) return <h1>No feedbacks found</h1>

    return (
        <>
            <CardList cards={data?.feedbacks} />
        </>
    )
}