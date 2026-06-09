// app/search/page.jsx
import SearchClient from "@/app/components/SearchClient";

export const metadata = {
  title: "Search Scam Reports",
  description:
    "Search our database of scam reports by suspect name, email, phone number, username, or keywords. Check if someone has been reported.",
  alternates: { canonical: "/search" },
};

export default function SearchPage() {
  return <SearchClient />;
}
