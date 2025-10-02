import { PaginatedTable } from '@/components/astrify/table/paginated-table';
import { useState } from 'react';

// Full dataset for client-side pagination
const allUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', created_at: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active', created_at: '2024-02-20' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Editor', status: 'Active', created_at: '2024-03-10' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'User', status: 'Inactive', created_at: '2024-04-05' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'User', status: 'Active', created_at: '2024-05-12' },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Editor', status: 'Active', created_at: '2024-06-18' },
    { id: 7, name: 'Grace Wilson', email: 'grace@example.com', role: 'User', status: 'Active', created_at: '2024-07-22' },
    { id: 8, name: 'Henry Moore', email: 'henry@example.com', role: 'User', status: 'Inactive', created_at: '2024-08-30' },
    { id: 9, name: 'Ivy Taylor', email: 'ivy@example.com', role: 'Admin', status: 'Active', created_at: '2024-09-14' },
    { id: 10, name: 'Jack Anderson', email: 'jack@example.com', role: 'User', status: 'Active', created_at: '2024-09-28' },
    { id: 11, name: 'Kate Johnson', email: 'kate@example.com', role: 'User', status: 'Active', created_at: '2024-10-02' },
    { id: 12, name: 'Liam White', email: 'liam@example.com', role: 'Editor', status: 'Active', created_at: '2024-10-15' },
    { id: 13, name: 'Mia Harris', email: 'mia@example.com', role: 'User', status: 'Active', created_at: '2024-11-01' },
    { id: 14, name: 'Noah Clark', email: 'noah@example.com', role: 'Admin', status: 'Active', created_at: '2024-11-12' },
    { id: 15, name: 'Olivia Lewis', email: 'olivia@example.com', role: 'User', status: 'Inactive', created_at: '2024-11-20' },
];

const ITEMS_PER_PAGE = 5;

export function PaginatedTablePreview() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = allUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Generate pagination links
    const generateLinks = () => {
        const links = [];
        links.push({ url: currentPage > 1 ? `page-${currentPage - 1}` : null, label: '&laquo; Previous', active: false });

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                links.push({ url: `page-${i}`, label: String(i), active: i === currentPage });
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                links.push({ url: null, label: '...', active: false });
            }
        }

        links.push({ url: currentPage < totalPages ? `page-${currentPage + 1}` : null, label: 'Next &raquo;', active: false });
        return links;
    };

    const handlePageChange = (url: string | null) => {
        if (!url) return;
        const page = parseInt(url.split('-')[1]);
        setCurrentPage(page);
    };

    return (
        <div className="w-full max-w-4xl">
            <PaginatedTable
                columns={['ID', 'Name', 'Email', 'Role', 'Status', 'Created']}
                data={currentData.map((user) => [user.id, user.name, user.email, user.role, user.status, user.created_at])}
                pagination={{
                    type: 'numeric',
                    currentPage: currentPage,
                    lastPage: totalPages,
                    links: generateLinks(),
                    onChangePage: handlePageChange,
                    total: allUsers.length,
                }}
            />
        </div>
    );
}

export const PaginatedTablePreviewSource = `import PaginatedTable from '@/components/astrify/table/paginated-table';

export function PaginatedTablePreview() {
  return (
    <PaginatedTable
        columns={['ID', 'Name', 'Email', 'Created']}
        data={users.data.map((user) => [user.id, user.name, user.email, new Date(user.created_at).toLocaleDateString()])}
        pagination={{
            type: 'numeric',
            currentPage: users.current_page,
            lastPage: users.last_page,
            links: users.links,
            onChangePage: handlePageChange, // custom page-change handler
            total: users.total,
        }}
    />
  )
`;


export const JsonTablePreviewSource = `import JsonTable from '@/components/astrify/table/json-table';

export function JsonTablePreview() {
  return (
    <JsonTable
        url="/api/user-table-data"
        columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'created_at', label: 'Created' },
        ]}
        paginationType="numeric"
        formatCell={(key, value) => {
            if (key === 'created_at') return new Date(value).toLocaleDateString();
            return value;
        }}
    />
  )
`;
