import { useState, useEffect } from 'react'
import PaginatedTable from './paginated-table'
import type { PaginationType } from './paginator'
import { Loader2, AlertCircle } from 'lucide-react'

interface JsonTableColumn {
    key: string
    label: string
}

interface JsonTableProps {
    url: string
    columns: JsonTableColumn[]
    paginationType?: PaginationType
    formatCell?: (key: string, value: any) => string | number
}

interface PaginatedResponse {
    data: any[]
    current_page: number
    last_page: number
    total: number
    links: Array<{
        url: string | null
        label: string
        active: boolean
    }>
}

export default function JsonTable({
    url,
    columns,
    paginationType = 'numeric',
    formatCell,
}: JsonTableProps) {
    const [data, setData] = useState<PaginatedResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async (fetchUrl: string) => {
        try {
            setLoading(true)
            const response = await fetch(fetchUrl)
            if (!response.ok) throw new Error('Failed to fetch data')
            const jsonData = await response.json()
            setData(jsonData)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(url)
    }, [url])

    const handlePageChange = (pageUrl: string | null) => {
        if (!pageUrl) return
        fetchData(pageUrl)
    }

    const tableData = data?.data.map((row) =>
        columns.map((col) => {
            const value = row[col.key]
            return formatCell ? formatCell(col.key, value) : value
        })
    ) || []

    let placeholder = null
    if (loading && !data) {
        placeholder = (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <Loader2 className="size-12 text-muted-foreground/50 mb-4 animate-spin" />
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Loading data</h3>
            </div>
        )
    } else if (error) {
        placeholder = (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <AlertCircle className="size-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground/60">{error}</p>
            </div>
        )
    }

    return (
        <div className={loading && data ? 'opacity-50 pointer-events-none' : ''}>
            <PaginatedTable
                columns={columns.map((col) => col.label)}
                data={tableData}
                pagination={{
                    type: paginationType,
                    currentPage: data?.current_page || 1,
                    lastPage: data?.last_page || 1,
                    links: data?.links || [],
                    onChangePage: handlePageChange,
                    total: data?.total || 0,
                }}
                placeholder={placeholder}
            />
        </div>
    )
}
