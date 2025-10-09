"use client";

import { useMemo, useRef, useState, useEffect } from "react";

/**
 * Searchable dropdown with logo thumbnails + "Other" option.
 *
 * Props:
 * - items: [{slug, name}]
 * - name: HTML name for the hidden input
 * - label, placeholder
 * - kind: "brands" | "retailers" (logo path /logos/{kind}/{slug}.svg)
 * - includeOther: boolean -> shows “Other (type name)”
 * - defaultValue: { label?: string }  // initial human-friendly label
 */
export default function SearchSelect({
  items = [],
  name,
  label,
  placeholder = "Search…",
  kind = "brands",
  includeOther = true,
  defaultValue,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(defaultValue?.label || "");
  const [customOther, setCustomOther] = useState("");

  const boxRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const fullList = useMemo(() => {
    const base = items.slice();
    if (includeOther) base.push({ slug: "__other__", name: "Other (type name)" });
    return base;
  }, [items, includeOther]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fullList.slice(0, 12);
    return fullList.filter((i) => i.name.toLowerCase().includes(q)).slice(0, 12);
  }, [fullList, query]);

  function choose(it) {
    if (it.slug === "__other__") {
      setSelected("Other");
      setCustomOther("");
    } else {
      setSelected(it.name);
      setCustomOther("");
    }
    setQuery("");
    setOpen(false);
  }

  const isOther = selected === "Other";
  const hiddenValue = isOther ? customOther : selected;

  return (
    <div className="w-full" ref={boxRef}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="text"
          value={selected || query}
          onChange={(e) => {
            setSelected("");
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[15px] outline-none focus:border-slate-400"
          aria-autocomplete="list"
        />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="absolute right-1.5 top-1.5 rounded p-1 text-slate-500 hover:bg-slate-100"
          aria-label="Toggle"
        >
          ▾
        </button>

        {open && (
          <div className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-sm text-slate-500">No matches.</div>
            )}
            {filtered.map((it) => (
              <button
                key={it.slug + it.name}
                type="button"
                onClick={() => choose(it)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-slate-50"
              >
                {it.slug !== "__other__" ? (
                  <img
                    src={`/logos/${kind}/${it.slug}.svg`}
                    alt=""
                    className="h-5 w-5 rounded"
                    onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                  />
                ) : (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-[10px] font-bold text-slate-700">
                    +
                  </span>
                )}
                <span className="text-sm text-slate-800">{it.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Show custom text when Other */}
      {isOther && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Type the name"
            value={customOther}
            onChange={(e) => setCustomOther(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <p className="mt-1 text-xs text-slate-500">
            This will be saved exactly as typed.
          </p>
        </div>
      )}

      {/* Hidden value (human label or custom) */}
      <input type="hidden" name={name} value={hiddenValue || ""} />
    </div>
  );
}
