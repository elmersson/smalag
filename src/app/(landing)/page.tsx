import CallToAction from "./_components/call-to-action";
import DashboardSnippet from "./_components/dashboard-snippet";
import { FeatureSection } from "./_components/features";

export default function Home() {
  return (
    <main className="md:px-10 py-20 flex flex-col gap-36">
      <div>
        <CallToAction />
        <DashboardSnippet />
      </div>
      <FeatureSection />
    </main>
  );
}
