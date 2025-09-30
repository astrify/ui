import { useState } from 'react';
import NumericPagination from '@/components/astrify/table/numeric-pagination';

// Sample data for demonstration
const sampleUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
    { id: 6, name: 'Diana Davis', email: 'diana@example.com', role: 'Editor', status: 'Active' },
    { id: 7, name: 'Eve Miller', email: 'eve@example.com', role: 'User', status: 'Inactive' },
    { id: 8, name: 'Frank Garcia', email: 'frank@example.com', role: 'User', status: 'Active' },
    { id: 9, name: 'Grace Lee', email: 'grace@example.com', role: 'Admin', status: 'Active' },
    { id: 10, name: 'Henry Taylor', email: 'henry@example.com', role: 'Editor', status: 'Active' },
    { id: 11, name: 'Ivy Anderson', email: 'ivy@example.com', role: 'User', status: 'Active' },
    { id: 12, name: 'Jack Thomas', email: 'jack@example.com', role: 'User', status: 'Inactive' },
];

const ITEMS_PER_PAGE = 5;

export function TableDemo() {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(sampleUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentUsers = sampleUsers.slice(startIndex, endIndex);

    // Mock pagination links (similar to Laravel's pagination structure)
    const generatePaginationLinks = () => {
        const links = [];
        
        // Previous link
        links.push({
            url: currentPage > 1 ? `?page=${currentPage - 1}` : null,
            label: '&laquo; Previous',
            active: false,
        });

        // Page number links
        for (let i = 1; i <= totalPages; i++) {
            links.push({
                url: `?page=${i}`,
                label: i.toString(),
                active: i === currentPage,
            });
        }

        // Next link
        links.push({
            url: currentPage < totalPages ? `?page=${currentPage + 1}` : null,
            label: 'Next &raquo;',
            active: false,
        });

        return links;
    };

    const handlePageChange = (url: string | null) => {
        if (!url) return;
        const pageMatch = url.match(/page=(\d+)/);
        if (pageMatch) {
            setCurrentPage(parseInt(pageMatch[1]));
        }
    };

    return (
        <div className="w-full max-w-4xl">
            <NumericPagination
                columns={['ID', 'Name', 'Email', 'Role', 'Status']}
                data={currentUsers.map((user) => [
                    user.id,
                    user.name,
                    user.email,
                    user.role,
                    user.status,
                ])}
                pagination={{
                    currentPage,
                    lastPage: totalPages,
                    links: generatePaginationLinks(),
                    onChangePage: handlePageChange,
                    total: sampleUsers.length,
                }}
            />
        </div>
    );
}

export const TableDemoSource = `import { useState } from 'react';
import NumericPagination from '@/components/astrify/table/numeric-pagination';

// Sample data for demonstration
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
  { id: 6, name: 'Diana Davis', email: 'diana@example.com', role: 'Editor', status: 'Active' },
  { id: 7, name: 'Eve Miller', email: 'eve@example.com', role: 'User', status: 'Inactive' },
  { id: 8, name: 'Frank Garcia', email: 'frank@example.com', role: 'User', status: 'Active' },
  { id: 9, name: 'Grace Lee', email: 'grace@example.com', role: 'Admin', status: 'Active' },
  { id: 10, name: 'Henry Taylor', email: 'henry@example.com', role: 'Editor', status: 'Active' },
  { id: 11, name: 'Ivy Anderson', email: 'ivy@example.com', role: 'User', status: 'Active' },
  { id: 12, name: 'Jack Thomas', email: 'jack@example.com', role: 'User', status: 'Inactive' },
];

const ITEMS_PER_PAGE = 5;

export function TableDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(sampleUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = sampleUsers.slice(startIndex, endIndex);

  // Mock pagination links (similar to Laravel's pagination structure)
  const generatePaginationLinks = () => {
    const links = [];
    
    // Previous link
    links.push({
      url: currentPage > 1 ? \`?page=\${currentPage - 1}\` : null,
      label: '&laquo; Previous',
      active: false,
    });

    // Page number links
    for (let i = 1; i <= totalPages; i++) {
      links.push({
        url: \`?page=\${i}\`,
        label: i.toString(),
        active: i === currentPage,
      });
    }

    // Next link
    links.push({
      url: currentPage < totalPages ? \`?page=\${currentPage + 1}\` : null,
      label: 'Next &raquo;',
      active: false,
    });

    return links;
  };

  const handlePageChange = (url: string | null) => {
    if (!url) return;
    const pageMatch = url.match(/page=(\\d+)/);
    if (pageMatch) {
      setCurrentPage(parseInt(pageMatch[1]));
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <NumericPagination
        columns={['ID', 'Name', 'Email', 'Role', 'Status']}
        data={currentUsers.map((user) => [
          user.id,
          user.name,
          user.email,
          user.role,
          user.status,
        ])}
        pagination={{
          currentPage,
          lastPage: totalPages,
          links: generatePaginationLinks(),
          onChangePage: handlePageChange,
          total: sampleUsers.length,
        }}
      />
    </div>
  );
}`;

