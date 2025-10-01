import React from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination"

export type PaginationType = "simple" | "numeric"

interface PaginationLinkType {
    url: string | null
    label: string
    active: boolean
}

interface PaginatorProps {
    type: PaginationType
    currentPage: number
    lastPage: number
    links: PaginationLinkType[]
    onChangePage: (url: string | null) => void
    total?: number
    currentPageSize?: number
}

export default function Paginator({
    type,
    currentPage,
    lastPage,
    links,
    onChangePage,
    total,
    currentPageSize,
}: PaginatorProps) {
    const handlePageClick = (e: React.MouseEvent, url: string | null) => {
        e.preventDefault()
        if (url) onChangePage(url)
    }

    const prevLink = links.find((l) => l.label.toLowerCase().includes('previous'))
    const nextLink = links.find((l) => l.label.toLowerCase().includes('next'))

    const isPrevDisabled = currentPage <= 1
    const isNextDisabled = currentPage >= lastPage

    if (type === "simple") {
        const totalRecords = total || 0
        const itemsOnPage = currentPageSize || 0
        const perPage = Math.ceil(totalRecords / lastPage)
        const from = totalRecords > 0 && itemsOnPage > 0 ? (currentPage - 1) * perPage + 1 : 0
        const to = from > 0 ? from + itemsOnPage - 1 : 0

        return (
            <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                    Showing {from} to {to} of {totalRecords} results
                </div>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => !isPrevDisabled && handlePageClick(e, prevLink?.url || null)}
                            className={isPrevDisabled ? 'pointer-events-none opacity-50' : ''}
                            size="default"
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => !isNextDisabled && handlePageClick(e, nextLink?.url || null)}
                            className={isNextDisabled ? 'pointer-events-none opacity-50' : ''}
                            size="default"
                        />
                    </PaginationItem>
                </PaginationContent>
            </div>
        )
    }

    // Numeric pagination
    const pageLinks = links.filter(
        (link) => !['Next &raquo;', '&laquo; Previous'].includes(link.label)
    )

    return (
        <Pagination className="justify-start">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => !isPrevDisabled && handlePageClick(e, prevLink?.url || null)}
                        className={isPrevDisabled ? 'pointer-events-none opacity-50' : ''}
                        size="default"
                    />
                </PaginationItem>

                {pageLinks.map((link, idx) =>
                    link.label === '...' ? (
                        <PaginationItem key={idx}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={idx}>
                            <PaginationLink
                                size="default"
                                href="#"
                                isActive={link.active}
                                onClick={(e) => handlePageClick(e, link.url)}
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => !isNextDisabled && handlePageClick(e, nextLink?.url || null)}
                        className={isNextDisabled ? 'pointer-events-none opacity-50' : ''}
                        size="default"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
