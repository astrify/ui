import React from "react" // or your own type definitions
import NumericPagination from "@/components/astrify/table/numeric-pagination"
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Table Example',
        href: dashboard().url,
    },
];

interface User {
    id: number
    name: string
    email: string
    created_at: string
}

interface Props {
    users: {
        data: User[]
        current_page: number
        last_page: number
        total: number
        links: Array<{
            url: string | null
            label: string
            active: boolean
        }>
    }
}

export default function Index({ users }: Props) {
    /**
     * If you want to programmatically handle page changes (rather than just using the link URLs),
     * you can define a function like this:
     */
    const handlePageChange = (url: string | null) => {
        if (!url) return
        router.get(url, {}, { preserveScroll: true, preserveState: true })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-bold mb-4">Users</h1>
                <NumericPagination
                    columns={["ID", "Name", "Email", "Created"]}
                    data={users.data.map((user) => [
                        user.id,
                        user.name,
                        user.email,
                        new Date(user.created_at).toLocaleDateString(),
                    ])}
                    pagination={{
                        currentPage: users.current_page,
                        lastPage: users.last_page,
                        links: users.links,
                        onChangePage: handlePageChange, // Our custom page-change handler
                        total: users.total,
                    }}
                />
            </div>
        </AppLayout>
    )
}
