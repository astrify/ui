import { router } from '@inertiajs/react';
import NumericPagination from '@/components/astrify/table/numeric-pagination';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
}

interface TableDemoProps {
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

export function TableDemo({ users }: TableDemoProps) {
    const handlePageChange = (url: string | null) => {
        if (!url) return;
        router.get(url, {}, { preserveScroll: true, preserveState: true });
    };

    return (
        <div className="w-full max-w-4xl">
            <NumericPagination
                columns={['ID', 'Name', 'Email', 'Role', 'Status', 'Created']}
                data={users.data.map((user) => [
                    user.id,
                    user.name,
                    user.email,
                    user.role,
                    user.status,
                    new Date(user.created_at).toLocaleDateString(),
                ])}
                pagination={{
                    currentPage: users.current_page,
                    lastPage: users.last_page,
                    links: users.links,
                    onChangePage: handlePageChange,
                    total: users.total,
                }}
            />
        </div>
    );
}

export const TableDemoSource = `import { router } from '@inertiajs/react';
import NumericPagination from '@/components/astrify/table/numeric-pagination';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

interface TableDemoProps {
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

export function TableDemo({ users }: TableDemoProps) {
  const handlePageChange = (url: string | null) => {
    if (!url) return;
    router.get(url, {}, { preserveScroll: true, preserveState: true });
  };

  return (
    <div className="w-full max-w-4xl">
      <NumericPagination
        columns={['ID', 'Name', 'Email', 'Role', 'Status', 'Created']}
        data={users.data.map((user) => [
          user.id,
          user.name,
          user.email,
          user.role,
          user.status,
          new Date(user.created_at).toLocaleDateString(),
        ])}
        pagination={{
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

