import RecaptchaProvider from "@/app/providers/RecaptchaProvider";
import CaseBuilder from "@/app/components/CaseBuilder";

export const metadata = {
  title: "Build Your Scam Report",
  description: "Step-by-step guided scam reporting tool. Describe what happened in your own words — AI extracts the details and builds a structured report for investigators.",
  alternates: { canonical: "/case-builder" },
};

export default function CaseBuilderPage() {
  return (
    <RecaptchaProvider>
      <CaseBuilder />
    </RecaptchaProvider>
  );
}
