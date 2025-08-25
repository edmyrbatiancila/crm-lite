import { FilterOption, SortOption } from '@/components/shared/search-and-filter';

export const taskFilterOptions: FilterOption[] = [
    {
        label: 'Status',
        value: 'status',
        type: 'select',
        options: [
            { label: 'To Do', value: 'todo' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Review', value: 'review' },
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
        label: 'Category',
        value: 'category',
        type: 'select',
        options: [
            { label: 'Development', value: 'development' },
            { label: 'Design', value: 'design' },
            { label: 'Testing', value: 'testing' },
            { label: 'Documentation', value: 'documentation' },
            { label: 'Meeting', value: 'meeting' },
            { label: 'Research', value: 'research' },
            { label: 'Bug Fix', value: 'bug_fix' },
        ],
        placeholder: 'Select category'
    },
    {
        label: 'Due Date',
        value: 'deadline_at',
        type: 'date',
        placeholder: 'Select due date'
    },
    {
        label: 'Created Date',
        value: 'created_at',
        type: 'date',
        placeholder: 'Select creation date'
    },
    {
        label: 'Project',
        value: 'project_title',
        type: 'text',
        placeholder: 'Enter project name'
    },
    {
        label: 'Assigned To',
        value: 'assigned_to',
        type: 'text',
        placeholder: 'Enter assigned user'
    }
];

export const taskSortOptions: SortOption[] = [
    { label: 'Task Title', value: 'title' },
    { label: 'Status', value: 'status' },
    { label: 'Priority', value: 'priority' },
    { label: 'Due Date', value: 'deadline_at' },
    { label: 'Created Date', value: 'created_at' },
    { label: 'Last Updated', value: 'updated_at' },
    { label: 'Project', value: 'project_title' },
    { label: 'Assigned User', value: 'assigned_to' },
];
