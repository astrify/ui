import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
import { transformers } from './resources/js/lib/highlight-code';
import inertiaMdxPages from './resources/js/lib/inertia-mdx-pages';
import { wayfinder } from "@laravel/vite-plugin-wayfinder";

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder(),
        // MDX transform so generated pages can import MDX + frontmatter
        mdx({
            remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }]],
            rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                [
                    rehypePrettyCode,
                    {
                        theme: {
                            dark: 'github-dark',
                            light: 'github-light',
                        },
                        transformers: transformers,
                        keepBackground: false,
                    },
                ],
            ],
            // Use our custom components
            providerImportSource: '@mdx-js/react',
            // Better error handling
            format: 'mdx',
            development: process.env.NODE_ENV === 'development',
        }),
        // Our generator (defaults already match your structure)
        inertiaMdxPages({
            // postsDir: 'resources/js/posts',
            // pagesOutDir: 'resources/js/pages/blog/posts',
            templatePath: 'resources/js/layouts/docs-layout.tsx',
            // manifestPath: 'bootstrap/cache/mdx.json',
            // pageExt: 'tsx',
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js'),
        },
    },
});
