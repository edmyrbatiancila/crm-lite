import { FilterOption, SortOption } from '@/components/shared/search-and-filter';

export const clientFilterOptions: FilterOption[] = [
    {
        label: 'Status',
        value: 'status',
        type: 'select',
        options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Potential', value: 'potential' },
            { label: 'Lost', value: 'lost' },
        ],
        placeholder: 'Select status'
    },
    {
        label: 'Industry',
        value: 'industry',
        type: 'select',
        options: [
            { label: 'Technology', value: 'technology' },
            { label: 'Healthcare', value: 'healthcare' },
            { label: 'Finance', value: 'finance' },
            { label: 'Manufacturing', value: 'manufacturing' },
            { label: 'Retail', value: 'retail' },
            { label: 'Education', value: 'education' },
            { label: 'Other', value: 'other' },
        ],
        placeholder: 'Select industry'
    },
    {
        label: 'Company Size',
        value: 'company_size',
        type: 'select',
        options: [
            { label: '1-10 employees', value: '1-10' },
            { label: '11-50 employees', value: '11-50' },
            { label: '51-200 employees', value: '51-200' },
            { label: '201-500 employees', value: '201-500' },
            { label: '500+ employees', value: '500+' },
        ],
        placeholder: 'Select company size'
    },
    {
        label: 'Assigned To',
        value: 'assigned_to',
        type: 'text',
        placeholder: 'Enter assigned user'
    }
];

export const clientSortOptions: SortOption[] = [
    { label: 'Company Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
];
