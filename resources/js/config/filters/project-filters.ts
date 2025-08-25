import { FilterOption, SortOption } from '@/components/shared/search-and-filter';

export const projectFilterOptions: FilterOption[] = [
    {
        label: 'Status',
        value: 'status',
        type: 'select',
        options: [
            { label: 'Planning', value: 'planning' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'On Hold', value: 'on_hold' },
            { label: 'Completed', value: 'completed' },
            { label: 'Cancelled', value: 'cancelled' },
        ],
        placeholder: 'Select status'
    },
    {
        label: 'Priority',
        value: 'priority',
        type: 'select',
        options: [
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
            { label: 'Critical', value: 'critical' },
        ],
        placeholder: 'Select priority'
    },
    {
        label: 'Budget Range',
        value: 'budget_range',
        type: 'select',
        options: [
            { label: 'Under $10,000', value: 'under_10k' },
            { label: '$10,000 - $50,000', value: '10k_50k' },
            { label: '$50,000 - $100,000', value: '50k_100k' },
            { label: 'Over $100,000', value: 'over_100k' },
        ],
        placeholder: 'Select budget range'
    },
    {
        label: 'Start Date',
        value: 'start_date',
        type: 'date',
        placeholder: 'Select start date'
    },
    {
        label: 'Deadline',
        value: 'deadline_at',
        type: 'date',
        placeholder: 'Select deadline'
    },
    {
        label: 'Client',
        value: 'client_name',
        type: 'text',
        placeholder: 'Enter client name'
    },
    {
        label: 'Assigned To',
        value: 'assigned_to',
        type: 'text',
        placeholder: 'Enter assigned user'
    }
];

export const projectSortOptions: SortOption[] = [
    { label: 'Project Title', value: 'title' },
    { label: 'Status', value: 'status' },
    { label: 'Priority', value: 'priority' },
    { label: 'Start Date', value: 'start_date' },
    { label: 'Deadline', value: 'deadline_at' },
    { label: 'Created Date', value: 'created_at' },
    { label: 'Last Updated', value: 'updated_at' },
    { label: 'Budget', value: 'budget' },
];
