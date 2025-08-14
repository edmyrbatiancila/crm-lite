import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

export interface Pagination<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
}

export interface PaginationLinkItem {
    url: string | null
    label: string
    active: boolean
}
