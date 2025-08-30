import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from '@/components/ui/pagination';

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links?: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface ResponsivePaginationProps {
    data: PaginationData;
    baseUrl: string;
    searchParams?: URLSearchParams;
    className?: string;
    showResultsInfo?: boolean;
}

export function ResponsivePagination({
    data,
    baseUrl,
    searchParams = new URLSearchParams(),
    className = '',
    showResultsInfo = true,
}: ResponsivePaginationProps) {
    const { current_page: currentPage, last_page: totalPages, total, from, to } = data;

    if (totalPages <= 1) return null;

    // Create URL with current filters
    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams);
        
        if (page > 1) {
            params.set('page', String(page));
        } else {
            params.delete('page');
        }
        
        const queryString = params.toString();
        return `${baseUrl}${queryString ? '?' + queryString : ''}`;
    };

    const renderPageNumbers = () => {
        const items = [];
        const maxVisible = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        // First page
        if (startPage > 1) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink href={createPageUrl(1)} isActive={currentPage === 1}>
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            
            if (startPage > 2) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        // Page numbers
        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <PaginationItem key={page}>
                    <PaginationLink href={createPageUrl(page)} isActive={currentPage === page}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink href={createPageUrl(totalPages)} isActive={currentPage === totalPages}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Results Info */}
            {showResultsInfo && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        Showing {from?.toLocaleString() || 0} to {to?.toLocaleString() || 0} of{' '}
                        <span className="font-medium">{total.toLocaleString()}</span> results
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </div>
                </div>
            )}

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious 
                            href={currentPage > 1 ? createPageUrl(currentPage - 1) : undefined}
                            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                    
                    {renderPageNumbers()}
                    
                    <PaginationItem>
                        <PaginationNext 
                            href={currentPage < totalPages ? createPageUrl(currentPage + 1) : undefined}
                            className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default ResponsivePagination;
