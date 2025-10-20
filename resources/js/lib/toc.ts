import { toc } from 'mdast-util-toc';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';

const textTypes = ['text', 'emphasis', 'strong', 'inlineCode'];

function flattenNode(node: any): string {
    const p: string[] = [];
    visit(node, (node: any) => {
        if (!textTypes.includes(node.type)) return;
        p.push(node.value);
    });
    return p.join(``);
}

interface Item {
    title: string;
    url: string;
    items?: Item[];
}

interface Items {
    items?: Item[];
}

function getItems(node: any, current: any): Items {
    if (!node) {
        return {};
    }

    if (node.type === 'paragraph') {
        visit(node, (item) => {
            if (item.type === 'link') {
                current.url = item.url;
                current.title = flattenNode(node);
            }

            if (item.type === 'text') {
                current.title = flattenNode(node);
            }
        });

        return current;
    }

    if (node.type === 'list') {
        current.items = node.children.map((i: any) => getItems(i, {}));

        return current;
    } else if (node.type === 'listItem') {
        const heading = getItems(node.children[0], {});

        if (node.children.length > 1) {
            getItems(node.children[1], heading);
        }

        return heading;
    }

    return {};
}

const getToc = () => (node: any, file: any) => {
    const table = toc(node);
    const items = getItems(table.map, {});

    file.data = items;
};

export type TableOfContents = Items;

export async function getTableOfContents(content: string): Promise<TableOfContents> {
    const result = await remark().use(getToc).process(content);

    return result.data as TableOfContents;
}

// Convert our TOC structure to the format expected by the existing DocsTableOfContents component
export function convertTocForDocsComponent(toc: TableOfContents): Array<{
    title: string;
    url: string;
    depth: number;
}> {
    const flatToc: Array<{ title: string; url: string; depth: number }> = [];

    function flattenItems(items: Item[] | undefined, depth: number = 2) {
        if (!items) return;

        for (const item of items) {
            flatToc.push({
                title: item.title,
                url: item.url,
                depth,
            });

            if (item.items) {
                flattenItems(item.items, depth + 1);
            }
        }
    }

    flattenItems(toc.items);
    return flatToc;
}
