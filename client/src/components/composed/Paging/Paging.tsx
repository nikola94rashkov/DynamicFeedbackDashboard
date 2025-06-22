import type {FeedbackFilter, FeedbackList, FeedbackPagination} from "@/types/feedback.types.ts";

import './Paging.scss';

type PagingPops = {
    page: FeedbackPagination['page']
    totalPages: FeedbackList['totalPages']
    setFilters: (filters: Partial<FeedbackFilter> & { page: FeedbackPagination['page'] }) => void;
}

export const Paging = (props: PagingPops) => {
    const {
        page,
        totalPages,
        setFilters
    } = props;

    const showFirstSeparator = page > 3;
    const showLastSeparator = page < totalPages - 2;

    return(
        <div className="pagination">
            {page !== 1 && (
                <button
                    onClick={() => setFilters({ page: page - 1 })}
                    className="button"
                >
                    Previous
                </button>
            )}

            <button
                onClick={() => setFilters({ page: 1 })}
                className={`button ${page === 1 ? 'active' : ''}`}
            >
                1
            </button>

            {showFirstSeparator && <span className="pagination-separator">...</span>}

            {page !== 1 && page !== totalPages && (
                <button
                    className="button button--active"
                >
                    {page}
                </button>
            )}

            {showLastSeparator && <span className="pagination-separator">...</span>}

            {totalPages > 1 && (
                <button
                    onClick={() => setFilters({ page: totalPages })}
                    className={`button ${page === totalPages ? 'active' : ''}`}
                >
                    {totalPages}
                </button>
            )}

            {page !== totalPages && (
                <button
                    onClick={() => setFilters({ page: page + 1 })}
                    className="button"
                >
                    Next
                </button>
            )}
        </div>
    )
}