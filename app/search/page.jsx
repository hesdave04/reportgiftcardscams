// app/search/page.jsx
import SearchClient from "./SearchClient";

export const metadata = {
  title: "Search Scam Reports — ScamComplaints",
  description:
    "Search our database of scam reports by retailer, gift card brand, or keywords. Check if someone has been reported.",
  alternates: { canonical: "/search" },
};

export default function SearchPage() {
  return <SearchClient />;
}
