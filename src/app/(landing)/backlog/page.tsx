import GradientText from "@/components/global/gradient-text";
import { BacklogTable } from "./_components/backlog-tabble";

export default function BacklogPage() {
  return (
    <main className="md:px-10 py-20 flex flex-col gap-24">
      <div className="flex flex-col items-start md:items-center gap-y-6 md:gap-y-2">
        <GradientText
          className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
          element="H1"
        >
          Backlog
        </GradientText>
      </div>
      <BacklogTable />
    </main>
  );
}
