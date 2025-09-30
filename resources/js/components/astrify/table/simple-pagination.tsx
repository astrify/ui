import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination"

interface PaginationLinkType {
    url: string | null
    label: string
    active: boolean
}

interface SimplePaginatedTableProps {
    columns: string[]
    data: (string | number)[][]
    pagination: {
        currentPage: number
        lastPage: number
        links: PaginationLinkType[]
        onChangePage: (url: string | null) => void
        total?: number
    }
}

export default function NumericPagination({
    columns,
    data,
    pagination,
}: SimplePaginatedTableProps) {
    const { currentPage, lastPage, links, onChangePage, total } = pagination

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col, idx) => (
                            <TableHead key={idx}>{col}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center">
                                No data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Simple Pagination */}
            <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {lastPage}, showing {data.length} of {total || 0} total
                </div>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage <= 1) return;
                                const prevLink = links.find((l) => l.label.toLowerCase().includes('previous'));
                                onChangePage(prevLink?.url || null);
                            }}
                            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                            size="default"
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage >= lastPage) return;
                                const nextLink = links.find((l) => l.label.toLowerCase().includes('next'));
                                onChangePage(nextLink?.url || null);
                            }}
                            className={currentPage >= lastPage ? 'pointer-events-none opacity-50' : ''}
                            size="default"
                        />
                    </PaginationItem>
                </PaginationContent>
            </div>
        </div>
    );
}
