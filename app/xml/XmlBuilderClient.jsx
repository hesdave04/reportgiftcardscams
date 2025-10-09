"use client";

import { useState } from "react";
import FilterBar from "@/app/components/FilterBar";

export default function XmlBuilderClient() {
  const [url, setUrl] = useState("/api/xml");

  function onApply({ brand, retailer, q }) {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (retailer) params.set("retailer", retailer);
    if (q) params.set("q", q);
    const u = params.toString() ? `/api/xml?${params.toString()}` : "/api/xml";
    setUrl(u);
  }

  return (
    <div className="mt-6 space-y-4">
      <FilterBar initial={{}} onApply={onApply} />
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="text-sm text-slate-700">
          Request URL:
          <div className="mt-2 font-mono text-xs">
            <code>{url}</code>
          </div>
          <div className="mt-3">
            <a
              href={url}
              className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
              target="_blank"
            >
              Open XML (remember header)
            </a>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Add header <code>x-api-key: YOUR_XML_API_KEY</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
