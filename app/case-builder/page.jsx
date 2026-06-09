import CaseBuilder from "@/app/components/CaseBuilder";

export const metadata = {
  title: "Submit a Scam Report",
  description: "Step-by-step scam reporting flow",
  alternates: { canonical: "/case-builder" },
};

export default function CaseBuilderPage() {
  return <CaseBuilder />;
}
