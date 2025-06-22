import { Field, Select } from "@/components/ui";
import { categoryData, sortByData, statusData } from "@/data/selects-data.ts";
import type {FeedbackFilter} from "@/types/feedback.types.ts";
import './Filter.scss';

interface FilterProps {
    searchValue?: string;
    categoryValue: string;
    statusValue: string;
    sortByValue: string;
    setFilters: (filter: Partial<FeedbackFilter>) => void;
}

export const Filter = ({
   searchValue = '',
   categoryValue = '*',
   statusValue = '*',
   sortByValue = '*',
   setFilters
}: FilterProps) => {

    return (
        <div className="filter">
            <div className="filter__cols">
                <div className="filter__col">
                    <Field
                        id="search"
                        value={searchValue}
                        onChange={(e) => setFilters({ search: e.target.value })}
                        placeholder="Search feedbacks..."
                    />
                </div>

                <div className="filter__col">
                    <Select
                        id="category"
                        value={categoryValue}
                        options={categoryData}
                        onChange={(e) => setFilters({ category: e.target.value })}
                    />
                </div>

                <div className="filter__col">
                    <Select
                        id="status"
                        value={statusValue}
                        options={statusData}
                        onChange={(e) => setFilters({ status: e.target.value })}
                    />
                </div>

                <div className="filter__col">
                    <Select
                        id="sortBy"
                        value={sortByValue}
                        options={sortByData}
                        onChange={(e) => setFilters({ sortBy: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};