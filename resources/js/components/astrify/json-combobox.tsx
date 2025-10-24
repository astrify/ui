import { Check, ChevronsUpDown, AlertCircle } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";

type JsonComboboxOption = Record<string, any>;

type BaseProps = {
    url: string;
    valueKey?: string;
    labelKey?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    className?: string;
    defaultLabel?: string;
};

type Controlled = {
    value: string | number | null | undefined;
    onChange: (value: string | null) => void;
    defaultValue?: never;
};

type Uncontrolled = {
    value?: never;
    onChange?: (value: string | null) => void;
    defaultValue?: string | number;
};

type JsonComboboxProps = BaseProps & (Controlled | Uncontrolled);

function useDebounced<T>(value: T, delay = 300) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

export function JsonCombobox({
                                 url,
                                 valueKey = "value",
                                 labelKey = "label",
                                 placeholder = "Select option...",
                                 searchPlaceholder = "Search...",
                                 emptyText = "No results found.",
                                 defaultLabel,
                                 className,
                                 ...valueProps
                             }: JsonComboboxProps) {
    // Controlled vs uncontrolled
    const isControlled = "value" in valueProps;
    const [internalValue, setInternalValue] = useState<string>(
        "defaultValue" in valueProps && valueProps.defaultValue != null
            ? String(valueProps.defaultValue)
            : ""
    );
    const value = (isControlled ? valueProps.value : internalValue) ?? "";
    const emitChange = (next: string | null) => {
        if (!isControlled) setInternalValue(next ?? "");
        valueProps.onChange?.(next);
    };

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounced(query, 300);

    const [options, setOptions] = useState<JsonComboboxOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Keep a simple fetch cache keyed by search query to avoid extra requests
    const cacheRef = useRef<Map<string, JsonComboboxOption[]>>(new Map());

    // If we were given a defaultValue + defaultLabel, seed an initial option
    useEffect(() => {
        if (!options.length && value && defaultLabel) {
            setOptions([{ [valueKey]: String(value), [labelKey]: defaultLabel }]);
        }
        // run once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Measure trigger width so content matches button width without regex class parsing
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [contentWidth, setContentWidth] = useState<number | undefined>(undefined);
    useEffect(() => {
        if (!triggerRef.current) return;
        const el = triggerRef.current;
        const update = () => setContentWidth(el.getBoundingClientRect().width);
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, [triggerRef]);

    const fetchOptions = useCallback(
        async (search: string) => {
            // cache hit
            if (cacheRef.current.has(search)) {
                const cached = cacheRef.current.get(search)!;
                setOptions((prev) => mergeWithSelected(prev, cached, value, valueKey));
                setError(null);
                return;
            }

            setLoading(true);
            setError(null);
            const ac = new AbortController();

            try {
                const params = new URLSearchParams();
                if (search) params.set("search", search);
                const fetchUrl = `${url}${params.toString() ? `?${params.toString()}` : ""}`;

                const res = await fetch(fetchUrl, { signal: ac.signal });
                if (!res.ok) throw new Error("Failed to fetch options");

                const json = await res.json();
                const list = Array.isArray(json) ? json : [];

                cacheRef.current.set(search, list);
                setOptions((prev) => mergeWithSelected(prev, list, value, valueKey));
            } catch (e: any) {
                if (e?.name !== "AbortError") {
                    setError(e instanceof Error ? e.message : "An error occurred");
                    setOptions([]);
                }
            } finally {
                setLoading(false);
            }

            return () => ac.abort();
        },
        [url, value, valueKey]
    );

    // Fetch when opening or when debounced query changes
    useEffect(() => {
        fetchOptions(debouncedQuery);
    }, [debouncedQuery, fetchOptions]);

    // Ensure selected option is present if parent changes `value` externally
    useEffect(() => {
        if (!value) return;
        const exists = options.some((o) => String(o[valueKey]) === String(value));
        if (!exists && defaultLabel) {
            setOptions((prev) => [
                { [valueKey]: String(value), [labelKey]: defaultLabel },
                ...prev,
            ]);
        }
    }, [value, options, valueKey, labelKey, defaultLabel]);

    const selected = useMemo(
        () => options.find((o) => String(o[valueKey]) === String(value)),
        [options, value, valueKey]
    );

    const handleSelect = (selectedValue: string) => {
        const newValue = selectedValue === value ? "" : selectedValue;
        emitChange(newValue || null);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    ref={triggerRef}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("justify-between", className)}
                    onClick={() => {
                        // on first open, kick off a fetch if cache is empty
                        if (!cacheRef.current.has("") && !loading) fetchOptions("");
                    }}
                >
                    {selected ? selected[labelKey] : placeholder}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="p-0"
                align="start"
                style={contentWidth ? { width: contentWidth } : undefined}
            >
                <Command shouldFilter={false}>
                    <div className="relative">
                        <CommandInput
                            placeholder={searchPlaceholder}
                            value={query}
                            onValueChange={setQuery}
                            className="h-9"
                        />
                        {loading && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <Spinner className="size-4 text-muted-foreground/50" />
                            </div>
                        )}
                    </div>

                    <CommandList>
                        {error && (
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <AlertCircle className="mb-2 size-6 text-muted-foreground/50" />
                                <p className="text-xs text-muted-foreground/60">{error}</p>
                            </div>
                        )}

                        {!error && options.length === 0 && !loading && (
                            <CommandEmpty>{emptyText}</CommandEmpty>
                        )}

                        {!error && options.length > 0 && (
                            <CommandGroup>
                                {options.map((opt) => {
                                    const optVal = String(opt[valueKey]);
                                    const isSelected = String(value) === optVal;
                                    return (
                                        <CommandItem key={optVal} value={optVal} onSelect={handleSelect}>
                                            {opt[labelKey]}
                                            <Check
                                                className={cn(
                                                    "ml-auto size-4",
                                                    isSelected ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

/**
 * Ensures the selected option remains visible if it existed previously
 * but isn't in the new results.
 */
function mergeWithSelected(
    prev: JsonComboboxOption[],
    next: JsonComboboxOption[],
    currentValue: string | number | null | undefined,
    valueKey: string
) {
    if (!currentValue) return next;
    const val = String(currentValue);

    const inNext = next.some((o) => String(o[valueKey]) === val);
    if (inNext) return next;

    const foundPrev = prev.find((o) => String(o[valueKey]) === val);
    return foundPrev ? [foundPrev, ...next] : next;
}
