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
            <CardContent className="overflow-x-auto p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                        { columns.map((col, idx) => (
                            <TableHead key={ idx } className={ col.className }>
                                { col.label }
                            </TableHead>
                        )) }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    { data.map((item) => (
                        <TableRow key={ keyExtractor(item) }>
                        { columns.map((col, idx) => (
                            <TableCell key={ idx } className={ col.className }>
                                { col.render(item) }
                            </TableCell>
                        )) }
                        </TableRow>
                    )) }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
    
}

export default DataLists;