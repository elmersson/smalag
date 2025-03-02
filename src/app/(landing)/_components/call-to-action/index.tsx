import GradientText from "@/components/global/gradient-text";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "@/icons/badge-plus";
import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-start md:items-center gap-y-6 md:gap-y-2">
      <GradientText
        className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
        element="H1"
      >
        Bringing Communities <br className="md:hidden" /> Together
      </GradientText>
      <p className="text-sm md:text-center text-left text-muted-foreground">
        Smålag is a platform that empowers the developer and
        <br className="md:hidden" />
        people to connect, <br className="hidden md:block" /> collaborate, and
        cultivate meaningful
        <br className="md:hidden" />
        projects
      </p>
      <div className="flex md:flex-row flex-col md:justify-center gap-5 md:mt-5 w-full">
        <Link href="/login">
          <Button
            variant="outline"
            className="rounded-xl bg-transparent text-base"
          >
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button className="rounded-xl text-base flex gap-2 w-full">
            <BadgePlus /> Register
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
