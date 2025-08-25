import { FilterOption, SortOption } from '@/components/shared/search-and-filter';

export const userFilterOptions: FilterOption[] = [
    {
        label: 'Role',
        value: 'role',
        type: 'select',
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
            { label: 'Manager', value: 'manager' },
        ],
        placeholder: 'Select role'
    },
    {
        label: 'Status',
        value: 'status',
        type: 'select',
        options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Pending', value: 'pending' },
        ],
        placeholder: 'Select status'
    },
    {
        label: 'Registration Date',
        value: 'created_at',
        type: 'date',
        placeholder: 'Select registration date'
    },
    {
        label: 'Department',
        value: 'department',
        type: 'text',
        placeholder: 'Enter department'
    }
];

export const userSortOptions: SortOption[] = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Email', value: 'email' },
    { label: 'Registration Date', value: 'created_at' },
    { label: 'Last Login', value: 'last_login_at' },
];
