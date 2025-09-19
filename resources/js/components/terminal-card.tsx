type Line = {
    leading?: React.ReactNode; // e.g., "$" or "✓"
    content: React.ReactNode; // main text
    className?: string;
};

type TerminalCardProps = {
    title?: string; // e.g., "bash"
    lines?: Line[];
    className?: string;
};

export function TerminalCard({
    title = 'bash',
    className = '',
    lines = [
        {
            leading: <span className="text-emerald-400">$</span>,
            content: (
                <>
                    <span className="text-zinc-300">npx</span> <span className="text-emerald-400">shadcn</span>{' '}
                    <span className="text-zinc-300">add</span> <span className="text-white">@astrify/upload</span>
                </>
            ),
        },
        {
            leading: <span className="text-emerald-400">✓</span>,
            content: 'Checking registry.',
            className: 'text-zinc-300',
        },
        {
            leading: <span className="text-emerald-400">✓</span>,
            content: 'Installing dependencies.',
            className: 'text-zinc-300',
        },
        {
            leading: <span className="text-emerald-400">✓</span>,
            content: 'The file button.tsx already exists. Would you like to overwrite? … no',
            className: 'text-zinc-300',
        },
        {
            leading: <span className="text-blue-400">&nbsp;i</span>,
            content: 'Skipped 2 files: (files might be identical, use --overwrite to overwrite)',
            className: 'text-zinc-300',
        },
        {
            leading: <span>&nbsp;</span>,
            content: '- resources/js/components/ui/button.tsx',
            className: 'text-zinc-300',
        },
        {
            leading: <span>&nbsp;</span>,
            content: '- resources/js/components/ui/badge.tsx',
            className: 'text-zinc-300',
        },
        {
            leading: <span>&nbsp;</span>,
            content: '',
            className: 'text-zinc-300',
        },
        {
            leading: <span></span>,
            content: <span className="text-emerald-400">A fully functional upload module has been installed.</span>,
            className: 'text-zinc-300',
        },
    ],
}: TerminalCardProps) {
    return (
        <div
            className={['mx-auto max-w-3xl rounded-2xl bg-zinc-900 text-zinc-100 shadow-2xl ring-1 ring-black/10 dark:bg-zinc-800', className].join(
                ' ',
            )}
            role="region"
            aria-label="Terminal output"
        >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-zinc-300">{title}</span>
            </div>

            <div className="space-y-2 px-5 py-5 text-sm">
                {lines.map((line, i) => (
                    <div key={i} className={line.className}>
                        {line.leading ? <span className="mr-2">{line.leading}</span> : null}
                        <span>{line.content}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
