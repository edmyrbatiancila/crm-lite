export interface Column<T> {
    label: string;
    render: (item: T) => React.ReactNode;
    className?: string;
}