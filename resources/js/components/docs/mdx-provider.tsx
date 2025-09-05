import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { mdxComponents } from '@/components/docs/mdx-components';

export function MdxGlobalProvider({ children }: { children: React.ReactNode }) {
    return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
