import { useGetFeedbacksByUserIdQuery } from "@/store/feedback/feedbackApiSlice.ts";
import {CardList, Paging} from "@/components/composed";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store.ts";
import {useFilterOptions} from "@/hooks";

export const Dashboard = () => {
    const { user } = useSelector((state: RootState) => state.authSlice)
    const { setFilters } = useFilterOptions()
    const { data, isLoading, isError } = useGetFeedbacksByUserIdQuery({
        page: 1,
        limit: 10,
        userId: user?._id ? user?._id : ''
    }, {
        refetchOnMountOrArgChange: true
    });

    if(isLoading) return <h1>Loading...</h1>;
    if(isError) return <h1>Ops something went wrong!</h1>;

    return (
        <>
            {
                !data?.feedbacks.length ? <h1>No feedbacks found</h1> :  <CardList cards={data?.feedbacks} />
            }

            {
                data?.totalPages && <Paging
                    page={data.currentPage}
                    totalPages={data?.totalPages}
                    setFilters={setFilters}
                />
            }
        </>
    )
}