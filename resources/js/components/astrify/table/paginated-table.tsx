import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Inbox } from 'lucide-react';
import React from 'react';
import Paginator, { PaginationType } from './paginator';

interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedTableProps {
    columns: string[];
    data: (string | number)[][];
    pagination: {
        type: PaginationType;
        currentPage: number;
        lastPage: number;
        links: PaginationLinkType[];
        onChangePage: (url: string | null) => void;
        total?: number;
    };
    placeholder?: React.ReactNode;
}

export default function PaginatedTable({ columns, data, pagination, placeholder }: PaginatedTableProps) {
    const { type, currentPage, lastPage, links, onChangePage, total } = pagination;

    const defaultPlaceholder = (
        <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <Inbox className="mb-4 size-12 text-muted-foreground/40" />
            <h3 className="mb-1 text-sm font-medium text-muted-foreground">No data available</h3>
            <p className="text-sm text-muted-foreground/60">There are no records to display</p>
        </div>
    );

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
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {data.length === 0 ? (
                placeholder || defaultPlaceholder
            ) : (
                <Paginator
                    type={type}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    links={links}
                    onChangePage={onChangePage}
                    total={total}
                    currentPageSize={data.length}
                />
            )}
        </div>
    );
}
