import { FilterOption, SortOption } from '@/components/shared/search-and-filter';

export const activityLogFilterOptions: FilterOption[] = [
    {
        label: 'Log Type',
        value: 'log_name',
        type: 'select',
        options: [
            { label: 'Default', value: 'default' },
            { label: 'User', value: 'user' },
            { label: 'Client', value: 'client' },
            { label: 'Project', value: 'project' },
            { label: 'Task', value: 'task' },
        ],
        placeholder: 'Select log type'
    },
    {
        label: 'Event',
        value: 'event',
        type: 'select',
        options: [
            { label: 'Created', value: 'created' },
            { label: 'Updated', value: 'updated' },
            { label: 'Deleted', value: 'deleted' },
            { label: 'Restored', value: 'restored' },
        ],
        placeholder: 'Select event'
    },
    {
        label: 'Subject Type',
        value: 'subject_type',
        type: 'select',
        options: [
            { label: 'User', value: 'App\\Models\\User' },
            { label: 'Client', value: 'App\\Models\\Client' },
            { label: 'Project', value: 'App\\Models\\Project' },
            { label: 'Task', value: 'App\\Models\\Task' },
        ],
        placeholder: 'Select subject type'
    },
    {
        label: 'Performed By',
        value: 'causer.first_name',
        type: 'text',
        placeholder: 'Enter user name...'
    },
    {
        label: 'Date',
        value: 'created_at',
        type: 'date',
        placeholder: 'Select date'
    },
];

export const activityLogSortOptions: SortOption[] = [
    { label: 'Date Created', value: 'created_at' },
    { label: 'Description', value: 'description' },
    { label: 'Log Type', value: 'log_name' },
    { label: 'Event', value: 'event' },
    { label: 'Subject Type', value: 'subject_type' },
    { label: 'Performed By', value: 'causer.first_name' },
];

export const activityLogFilters = {
    filterOptions: activityLogFilterOptions,
    sortOptions: activityLogSortOptions,
};
