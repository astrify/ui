import { mdxComponents } from '@/components/docs/mdx-components';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';

export function MdxGlobalProvider({ children }: { children: React.ReactNode }) {
    return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
