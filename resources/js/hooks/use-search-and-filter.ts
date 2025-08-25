import { useState, useCallback } from 'react';
import { FilterValues } from '@/components/shared/search-and-filter';

export interface UseSearchAndFilterProps {
    initialSearch?: string;
    initialSort?: string;
    initialSortDirection?: 'asc' | 'desc';
    initialFilters?: FilterValues;
}

export interface UseSearchAndFilterReturn {
    searchValue: string;
    sortValue: string;
    sortDirection: 'asc' | 'desc';
    activeFilters: FilterValues;
    setSearchValue: (value: string) => void;
    setSortValue: (value: string) => void;
    setSortDirection: (direction: 'asc' | 'desc') => void;
    setActiveFilters: (filters: FilterValues) => void;
    handleSearchChange: (value: string) => void;
    handleSortChange: (value: string, direction: 'asc' | 'desc') => void;
    handleFilterChange: (filters: FilterValues) => void;
    handleReset: () => void;
    hasActiveFilters: boolean;
}

export const useSearchAndFilter = ({
    initialSearch = '',
    initialSort = '',
    initialSortDirection = 'asc',
    initialFilters = {}
}: UseSearchAndFilterProps = {}): UseSearchAndFilterReturn => {
    const [searchValue, setSearchValue] = useState(initialSearch);
    const [sortValue, setSortValue] = useState(initialSort);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
    const [activeFilters, setActiveFilters] = useState<FilterValues>(initialFilters);

    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const handleSortChange = useCallback((value: string, direction: 'asc' | 'desc') => {
        setSortValue(value);
        setSortDirection(direction);
    }, []);

    const handleFilterChange = useCallback((filters: FilterValues) => {
        setActiveFilters(filters);
    }, []);

    const handleReset = useCallback(() => {
        setSearchValue(initialSearch);
        setSortValue(initialSort);
        setSortDirection(initialSortDirection);
        setActiveFilters(initialFilters);
    }, [initialSearch, initialSort, initialSortDirection, initialFilters]);

    const hasActiveFilters = searchValue !== initialSearch || 
                           sortValue !== initialSort || 
                           sortDirection !== initialSortDirection ||
                           Object.values(activeFilters).some(value => 
                               value !== '' && value !== null && value !== undefined
                           );

    return {
        searchValue,
        sortValue,
        sortDirection,
        activeFilters,
        setSearchValue,
        setSortValue,
        setSortDirection,
        setActiveFilters,
        handleSearchChange,
        handleSortChange,
        handleFilterChange,
        handleReset,
        hasActiveFilters
    };
};
