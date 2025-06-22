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

            // Update page if provided
            if (newFilters.page !== undefined) {
                params.set('page', newFilters.page.toString());
            }

            // Update limit if provided
            if (newFilters.limit !== undefined) {
                params.set('limit', newFilters.limit.toString());
            }

            // Update category if provided (doesn't affect search)
            if (newFilters.category !== undefined) {
                if (newFilters.category && newFilters.category !== '*') {
                    params.set('category', newFilters.category);
                } else {
                    params.delete('category');
                }
            }

            // Update status if provided (doesn't affect search)
            if (newFilters.status !== undefined) {
                if (newFilters.status && newFilters.status !== '*') {
                    params.set('status', newFilters.status);
                } else {
                    params.delete('status');
                }
            }

            // Update sortBy if provided (doesn't affect search)
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

    const setSearch = useCallback((searchTerm: string) => {
        setSearchParams(prevParams => {
            const params = new URLSearchParams(prevParams);

            // Reset to page 1 when searching
            params.set('page', '1');

            if (searchTerm) {
                params.set('search', searchTerm);
            } else {
                params.delete('search');
            }

            return params;
        });
    }, [setSearchParams]);

    return {
        filters,
        setFilters,
        setSearch, // New separate function for search
    };
};