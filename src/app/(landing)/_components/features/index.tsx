import BackdropGradient from "@/components/global/backdrop-gradient";
import GradientText from "@/components/global/gradient-text";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SMALAG_CONSTANTS } from "@/constants";
import Link from "next/link";

export const FeatureSection = () => {
  return (
    <div
      className="w-full pt-20 flex flex-col items-center gap-3"
      id="features"
    >
      <BackdropGradient className="w-8/12 h-full opacity-40 flex flex-col items-center">
        <GradientText
          className="text-4xl font-semibold text-center"
          element="H2"
        >
          This is the features we have done now
        </GradientText>
        <p className="text-sm md:text-center text-left text-muted-foreground">
          Smålag is a platform that empowers the developer and
          <br className="md:hidden" />
          people to connect, <br className="hidden md:block" /> collaborate, and
          cultivate meaningful
        </p>
      </BackdropGradient>
      <div className="flex flex-wrap gap-10">
        <Card className="p-7 md:w-auto w-full bg-themeBlack border-themeGray">
          <div className="flex flex-col gap-2">
            <CardTitle>Done so far</CardTitle>
            <CardDescription className="text-[#B4B0AE]">
              Free for you
            </CardDescription>
            <Link href="#" className="w-full mt-3">
              <Button
                variant="default"
                className="bg-[#333337] w-full rounded-2xl text-white hover:text-[#333337]"
              >
                Sign up
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-[#B4B0AE] mt-5">
            <p>Features</p>
            {SMALAG_CONSTANTS.doneFeatures.map((feature) => (
              <span className="flex gap-2 mt-3 items-center" key={feature.id}>
                {feature.icon}
                {feature.label}
              </span>
            ))}
          </div>
        </Card>
        <Card className="p-7 md:w-auto w-full bg-themeBlack border-themeGray">
          <div className="flex flex-col gap-2">
            <CardTitle>In the backlog</CardTitle>
            <CardDescription className="text-[#B4B0AE]">
              Work for me
            </CardDescription>
            <Link href="/backlog" className="w-full mt-3">
              <Button
                variant="default"
                className="bg-[#333337] w-full rounded-2xl text-white hover:text-[#333337]"
              >
                See the backlog
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-[#B4B0AE] mt-5">
            <p>Features</p>
            {SMALAG_CONSTANTS.doneFeatures.map((feature) => (
              <span className="flex gap-2 mt-3 items-center" key={feature.id}>
                {feature.icon}
                {feature.label}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
