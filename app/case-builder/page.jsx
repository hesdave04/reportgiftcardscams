import RecaptchaProvider from "@/app/providers/RecaptchaProvider";
import CaseBuilder from "@/app/components/CaseBuilder";

export const metadata = {
  title: "Build Your Scam Report",
  description: "Step-by-step scam reporting flow",
};

export default function CaseBuilderPage() {
  return (
    <RecaptchaProvider>
      <CaseBuilder />
    </RecaptchaProvider>
  );
}
