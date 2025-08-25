import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, 
    Filter, 
    SortAsc, 
    SortDesc, 
    X, 
    Calendar as CalendarIcon,
    ChevronDown,
    RotateCcw
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export interface FilterOption {
    label: string;
    value: string;
    type: 'select' | 'date' | 'text';
    options?: { label: string; value: string }[];
    placeholder?: string;
}

export interface SortOption {
    label: string;
    value: string;
}

export type FilterValue = string | Date | null | undefined;
export type FilterValues = Record<string, FilterValue>;

export interface SearchAndFilterProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    sortValue: string;
    sortDirection: 'asc' | 'desc';
    onSortChange: (value: string, direction: 'asc' | 'desc') => void;
    filterOptions: FilterOption[];
    activeFilters: FilterValues;
    onFilterChange: (filters: FilterValues) => void;
    sortOptions: SortOption[];
    onReset: () => void;
    placeholder?: string;
}

const SearchAndFilter = ({
    searchValue,
    onSearchChange,
    sortValue,
    sortDirection,
    onSortChange,
    filterOptions,
    activeFilters,
    onFilterChange,
    sortOptions,
    onReset,
    placeholder = "Search..."
}: SearchAndFilterProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [tempFilters, setTempFilters] = useState(activeFilters);

    const activeFilterCount = Object.values(activeFilters).filter(value => 
        value !== '' && value !== null && value !== undefined
    ).length;

    const handleFilterApply = () => {
        onFilterChange(tempFilters);
        setIsFilterOpen(false);
    };

    const handleFilterReset = () => {
        setTempFilters({});
        onFilterChange({});
        setIsFilterOpen(false);
    };

    const handleTempFilterChange = (key: string, value: FilterValue) => {
        setTempFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const removeFilter = (key: string) => {
        const newFilters = { ...activeFilters };
        delete newFilters[key];
        onFilterChange(newFilters);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 mb-6"
        >
            {/* Search and Sort Row */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        type="text"
                        placeholder={placeholder}
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 pr-4"
                    />
                    {searchValue && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Sort Select */}
                <div className="flex gap-2">
                    <Select value={sortValue} onValueChange={(value) => onSortChange(value, sortDirection)}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onSortChange(sortValue, sortDirection === 'asc' ? 'desc' : 'asc')}
                        className="shrink-0"
                    >
                        {sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Filter Button */}
                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="relative">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                            {activeFilterCount > 0 && (
                                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                    {activeFilterCount}
                                </Badge>
                            )}
                            <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Filters</h4>
                                    <Button variant="ghost" size="sm" onClick={handleFilterReset}>
                                        <RotateCcw className="h-4 w-4 mr-1" />
                                        Reset
                                    </Button>
                                </div>
                                <Separator />
                                
                                {filterOptions.map((option) => (
                                    <div key={option.value} className="space-y-2">
                                        <Label htmlFor={option.value}>{option.label}</Label>
                                        
                                        {option.type === 'select' && option.options && (
                                            <Select
                                                value={(tempFilters[option.value] as string) || ''}
                                                onValueChange={(value) => handleTempFilterChange(option.value, value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder={option.placeholder || `Select ${option.label.toLowerCase()}`} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {option.options.map((opt) => (
                                                        <SelectItem key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                        
                                        {option.type === 'text' && (
                                            <Input
                                                id={option.value}
                                                type="text"
                                                placeholder={option.placeholder || `Enter ${option.label.toLowerCase()}`}
                                                value={(tempFilters[option.value] as string) || ''}
                                                onChange={(e) => handleTempFilterChange(option.value, e.target.value)}
                                            />
                                        )}
                                        
                                        {option.type === 'date' && (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {tempFilters[option.value] && tempFilters[option.value] instanceof Date 
                                                            ? format(tempFilters[option.value] as Date, "PPP") 
                                                            : option.placeholder || "Pick a date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={tempFilters[option.value] as Date | undefined}
                                                        onSelect={(date) => handleTempFilterChange(option.value, date)}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    </div>
                                ))}
                                
                                <Separator />
                                <div className="flex gap-2">
                                    <Button onClick={handleFilterApply} className="flex-1">
                                        Apply Filters
                                    </Button>
                                    <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </PopoverContent>
                </Popover>

                {/* Reset All Button */}
                {(searchValue || activeFilterCount > 0 || sortValue) && (
                    <Button variant="ghost" onClick={onReset}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset All
                    </Button>
                )}
            </div>

            {/* Active Filters */}
            <AnimatePresence>
                {activeFilterCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-wrap gap-2"
                    >
                        {Object.entries(activeFilters).map(([key, value]) => {
                            if (!value) return null;
                            const option = filterOptions.find(opt => opt.value === key);
                            if (!option) return null;
                            
                            let displayValue: string = '';
                            if (option.type === 'date' && value instanceof Date) {
                                displayValue = format(value, "MMM dd, yyyy");
                            } else if (option.type === 'select' && option.options) {
                                const selectedOption = option.options.find(opt => opt.value === value);
                                displayValue = selectedOption?.label || String(value);
                            } else {
                                displayValue = String(value);
                            }
                            
                            return (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Badge variant="secondary" className="px-3 py-1">
                                        <span className="text-xs font-medium mr-2">
                                            {option.label}: {displayValue}
                                        </span>
                                        <button
                                            onClick={() => removeFilter(key)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SearchAndFilter;
