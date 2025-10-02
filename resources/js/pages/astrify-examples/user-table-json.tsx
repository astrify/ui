import { JsonTable } from '@/components/astrify/table/json-table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'JSON Table Example',
        href: dashboard().url,
    },
];

export default function UserTableJson() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="JSON Table Example" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-xl font-bold">JSON Table Example</h1>
                    <p className="mb-4 text-sm">
                        This table uses JSON requests for it's data instead of Inertia requests. Useful when you need multiple tables on a single page
                        or don't want to tie the pagination to the rest of the page.
                    </p>
                </div>

                <JsonTable
                    url="/examples/user-table-json-data"
                    columns={[
                        { key: 'id', label: 'ID' },
                        { key: 'name', label: 'Name' },
                        { key: 'email', label: 'Email' },
                        { key: 'created_at', label: 'Created' },
                    ]}
                    paginationType="simple"
                    formatCell={(key, value) => {
                        if (key === 'created_at') return new Date(value).toLocaleDateString();
                        return value;
                    }}
                />
            </div>
        </AppLayout>
    );
}
