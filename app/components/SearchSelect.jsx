"use client";

import { useMemo, useRef, useState, useEffect } from "react";

/**
 * Searchable dropdown with logo thumbnails.
 *
 * Props:
 * - items: [{slug, name}]
 * - name: HTML name for the hidden input
 * - label, placeholder
 * - kind: "brands" | "retailers" (used for logo path /logos/{kind}/{slug}.svg)
 * - allowFreeText: if true, user can submit anything not in list
 * - defaultValue: {slug?, label?}  (initial selection)
 */
export default function SearchSelect({
  items = [],
  name,
  label,
  placeholder = "Search…",
  kind = "brands",
  allowFreeText = true,
  defaultValue,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(
    defaultValue?.slug
      ? items.find((i) => i.slug === defaultValue.slug) || null
      : defaultValue?.label
      ? { slug: null, name: defaultValue.label }
      : null
  );
  const boxRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items
      .filter((i) => i.name.toLowerCase().includes(q))
      .slice(0, 12);
  }, [items, query]);

  function choose(it) {
    setSelected(it);
    setQuery("");
    setOpen(false);
  }

  // What value goes to the hidden input
  const hiddenValue =
    selected?.slug ?? (allowFreeText ? selected?.name ?? "" : "");

  return (
    <div className="w-full" ref={boxRef}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      {/* visible input */}
      <div className="relative">
        <input
          type="text"
          value={selected ? selected.name : query}
          onChange={(e) => {
            setSelected(null);
            setQuery(e.target.value);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[15px] outline-none ring-0 focus:border-slate-400"
          aria-autocomplete="list"
        />

        {/* chevron */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="absolute right-1.5 top-1.5 rounded p-1 text-slate-500 hover:bg-slate-100"
          aria-label="Toggle"
        >
          ▾
        </button>

        {/* results */}
        {open && (
          <div className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-sm text-slate-500">
                {allowFreeText ? (
                  <>
                    No matches. Press <kbd>Enter</kbd> to use “{query}”.
                  </>
                ) : (
                  "No matches."
                )}
              </div>
            )}

            {filtered.map((it) => (
              <button
                key={it.slug}
                type="button"
                onClick={() => choose(it)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-slate-50"
              >
                <img
                  src={`/logos/${kind}/${it.slug}.svg`}
                  alt=""
                  className="h-5 w-5 rounded"
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                />
                <span className="text-sm text-slate-800">{it.name}</span>
              </button>
            ))}

            {allowFreeText && query && filtered.length === 0 && (
              <button
                type="button"
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => choose({ slug: null, name: query })}
              >
                Use “{query}”
              </button>
            )}
          </div>
        )}
      </div>

      {/* hidden value posted with the form */}
      <input type="hidden" name={name} value={hiddenValue} />
    </div>
  );
}
