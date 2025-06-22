import {useGetAllFeedbacksQuery} from "@/store/feedback/feedbackApiSlice.ts";
import {CardList, Filter, Paging} from "@/components/composed";
import {useFilterOptions} from "@/hooks";

export const Home = () => {
    const { filters , setFilters, setSearch} = useFilterOptions()
    const {  data, isLoading, isError } = useGetAllFeedbacksQuery({
        limit: 10,
        page: filters.page,
        search: filters.search,
        category: filters.category,
        status: filters.status,
        sortBy: filters.sortBy,
    })

    console.log('data', data)

    if(isLoading) return <h1>Loading...</h1>;
    if(isError) return <h1>Ops something went wrong!</h1>;

    return (
        <>
            <Filter
                setFilters={setFilters}
                setSearch={setSearch}
                sortByValue={filters.sortBy}
                categoryValue={filters.category}
                searchValue={filters.search}
                statusValue={filters.status}
            />

            {
                !data?.feedbacks.length ? <h1>No feedbacks found</h1> :  <CardList cards={data?.feedbacks} />
            }

            {
                data?.totalPages && <Paging
                    page={filters.page}
                    totalPages={data?.totalPages}
                    setFilters={setFilters}
                />
            }

        </>
    )
}