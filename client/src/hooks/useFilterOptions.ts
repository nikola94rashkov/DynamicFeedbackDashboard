import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type {FeedbackFilterAndPagination} from "@/types/feedback.types.ts";

export const useFilterOptions = (defaultLimit = 10) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(() => {
        const page = searchParams.get('page')
            ? parseInt(searchParams.get('page') as string)
            : 1;
        const limit = searchParams.get('limit')
            ? parseInt(searchParams.get('limit') as string)
            : defaultLimit;
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '*';
        const status = searchParams.get('status') || '*';
        const sortBy = searchParams.get('sortBy') || '*';

        return { page, limit, search, category, status, sortBy };
    }, [searchParams, defaultLimit]);

    const setFilters = useCallback((newFilters: Partial<FeedbackFilterAndPagination>) => {
        setSearchParams(prevParams => {
            const params = new URLSearchParams(prevParams);

            // Only update page if it's provided in newFilters
            if (newFilters.page !== undefined) {
                params.set('page', newFilters.page.toString());
            }

            if (newFilters.search !== undefined) {
                if (newFilters.search) {
                    params.set('search', newFilters.search);
                } else {
                    params.delete('search');
                }
            }

            if (newFilters.category !== undefined) {
                if (newFilters.category && newFilters.category !== '*') {
                    params.set('category', newFilters.category);
                } else {
                    params.delete('category');
                }
            }

            if (newFilters.status !== undefined) {
                if (newFilters.status && newFilters.status !== '*') {
                    params.set('status', newFilters.status);
                } else {
                    params.delete('status');
                }
            }

            if (newFilters.sortBy !== undefined) {
                if (newFilters.sortBy && newFilters.sortBy !== '*') {
                    params.set('sortBy', newFilters.sortBy);
                } else {
                    params.delete('sortBy');
                }
            }

            return params;
        });
    }, [setSearchParams]);

    return {
        filters,
        setFilters,
    };
};