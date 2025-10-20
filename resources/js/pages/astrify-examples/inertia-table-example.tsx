import { PaginatedTable } from '@/components/astrify/paginated-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inertia Table Example',
        href: '/inertia-table-example',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function InertiaTableExample({ users }: Props) {
    const handlePageChange = (url: string | null) => {
        if (!url) return;
        router.get(url, {}, { preserveScroll: true, preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inertia Table Example" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-xl font-bold">Inertia Table</h1>
                    <p className="mb-4 text-sm">
                        This table loads its data via Inertia requests. As you paginate this table the page number is reflected in the address bar.
                    </p>
                </div>
                <PaginatedTable
                    columns={['ID', 'Name', 'Email', 'Created']}
                    data={users.data.map((user) => [user.id, user.name, user.email, new Date(user.created_at).toLocaleDateString()])}
                    pagination={{
                        type: 'numeric',
                        currentPage: users.current_page,
                        lastPage: users.last_page,
                        links: users.links,
                        onChangePage: handlePageChange, // Our custom page-change handler
                        total: users.total,
                    }}
                />
            </div>
        </AppLayout>
    );
}
