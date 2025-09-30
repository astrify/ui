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
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination"

interface PaginationLinkType {
    url: string | null
    label: string
    active: boolean
}

interface NumericPaginatedTableProps {
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
}: NumericPaginatedTableProps) {
    const { currentPage, lastPage, links, onChangePage } = pagination

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

            {/* Numeric Pagination */}
            <Pagination className={'justify-start'}>
                <PaginationContent>
                    {/* "Previous" button */}
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

                    {/* Numbered pages */}
                    {links
                        .filter((link) => !['Next &raquo;', '&laquo; Previous'].includes(link.label))
                        .map((link, idx) => {
                            if (link.label === '...') {
                                return (
                                    <PaginationItem key={idx}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }
                            return (
                                <PaginationItem key={idx}>
                                    <PaginationLink
                                        size="default"
                                        href="#"
                                        isActive={link.active}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onChangePage(link.url);
                                        }}
                                    >
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                    {/* "Next" button */}
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
            </Pagination>
        </div>
    );
}
