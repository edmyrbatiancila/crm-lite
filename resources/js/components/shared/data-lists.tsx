import { Column } from "@/types/shared/database-column";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface IDataListsProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (item: T) => string | number | null;
}

const DataLists = <T,> ({
    columns,
    data,
    keyExtractor
}: IDataListsProps<T>) => {
    return (
        <Card className="shadow-xl border rounded-2xl">
            <CardContent className="p-0">
                {/* Container with fixed header and scrollable body */}
                <div className="h-[600px] flex flex-col">
                    {/* Fixed header - will not scroll */}
                    <div className="flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-600">
                        <Table className="min-w-full table-fixed">
                            <TableHeader>
                                <TableRow>
                                { columns.map((col, idx) => (
                                    <TableHead key={ idx } className={ `${col.className || ''} bg-gray-50 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100 py-4 px-4 text-left` }>
                                        { col.label }
                                    </TableHead>
                                )) }
                                </TableRow>
                            </TableHeader>
                        </Table>
                    </div>
                    
                    {/* Scrollable body only */}
                    <div className="flex-1 overflow-auto">
                        <Table className="min-w-full table-fixed">
                            <TableBody>
                            { data.map((item) => (
                                <TableRow key={ keyExtractor(item) } className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b dark:border-gray-700">
                                { columns.map((col, idx) => (
                                    <TableCell key={ idx } className={ `${col.className || ''} py-3 px-4` }>
                                        { col.render(item) }
                                    </TableCell>
                                )) }
                                </TableRow>
                            )) }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
    
}

export default DataLists;