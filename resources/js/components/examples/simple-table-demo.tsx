import { useState } from 'react';
import PaginatedTable from '@/components/astrify/table/paginated-table';

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

export function SimpleTableDemo() {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = allUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (url: string | null) => {
        if (!url) return;
        const page = parseInt(url.split('-')[1]);
        setCurrentPage(page);
    };

    const links = [
        { url: currentPage > 1 ? `page-${currentPage - 1}` : null, label: '&laquo; Previous', active: false },
        { url: currentPage < totalPages ? `page-${currentPage + 1}` : null, label: 'Next &raquo;', active: false },
    ];

    return (
        <div className="w-full max-w-4xl">
            <PaginatedTable
                columns={['ID', 'Name', 'Email', 'Role', 'Status', 'Created']}
                data={currentData.map((user) => [
                    user.id,
                    user.name,
                    user.email,
                    user.role,
                    user.status,
                    user.created_at,
                ])}
                pagination={{
                    type: "simple",
                    currentPage: currentPage,
                    lastPage: totalPages,
                    links: links,
                    onChangePage: handlePageChange,
                    total: allUsers.length,
                }}
            />
        </div>
    );
}

export const SimpleTableDemoSource = `import { router } from '@inertiajs/react';
import PaginatedTable from '@/components/astrify/table/paginated-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

interface SimpleTableDemoProps {
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

export function SimpleTableDemo({ users }: SimpleTableDemoProps) {
  const handlePageChange = (url: string | null) => {
    if (!url) return;
    router.get(url, {}, { preserveScroll: true, preserveState: true });
  };

  return (
    <div className="w-full max-w-4xl">
      <PaginatedTable
        columns={['ID', 'Name', 'Email', 'Role', 'Status', 'Created']}
        data={users.data.map((user) => [
          user.id,
          user.name,
          user.email,
          user.role,
          user.status,
          user.created_at,
        ])}
        pagination={{
          type: "simple",
          currentPage: users.current_page,
          lastPage: users.last_page,
          links: users.links,
          onChangePage: handlePageChange,
          total: users.total,
        }}
      />
    </div>
  );
}`;

