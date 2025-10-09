// app/xml/page.jsx
import XmlBuilderClient from "./XmlBuilderClient";

export const metadata = {
  title: "Download XML – Gift Card Reports",
  description: "Generate a filtered XML for law enforcement and issuers.",
};

export default function XmlPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">Download XML</h1>
      <p className="mt-2 text-slate-600">
        This endpoint requires your API key in the{" "}
        <code className="rounded bg-slate-100 px-1 py-0.5">x-api-key</code>{" "}
        header. Use filters below to build a URL.
      </p>
      <XmlBuilderClient />
    </main>
  );
}
