import {useGetAllFeedbacksQuery} from "@/store/feedback/feedbackApiSlice.ts";
import {CardList, Filter} from "@/components/composed";
import {useFilterOptions} from "@/hooks";

export const Home = () => {
    const { filters , setFilters } = useFilterOptions()
    const {  data, isLoading, isError } = useGetAllFeedbacksQuery({
        limit: 10,
        page: filters.page,
        search: filters.search,
        category: filters.category,
        status: filters.status,
        sortBy: filters.sortBy,
    })

    console.log('data', data)
    console.log('isLoading', isLoading)
    console.log('isError', isError)

    if(isLoading) return <h1>Loading...</h1>;

    return (
        <>
            <Filter
                setFilters={setFilters}
                sortByValue={filters.sortBy}
                categoryValue={filters.category}
                searchValue={filters.search}
                statusValue={filters.status}
            />

            {
                !data?.feedbacks.length ? <h1>No feedbacks found</h1> :  <CardList cards={data?.feedbacks} />
            }
        </>
    )
}