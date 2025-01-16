// import GlassSheet from "@/components/global/glass-sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { MenuIcon } from "lucide-react";
import { Logout } from "@/icons";
// import Menu from "./menu";

const LandingPageNavbar = () => {
  return (
    <div className="w-full flex justify-between sticky top-0 items-center py-5 z-50">
      <Link href="/">
        <p className="font-bold text-2xl">Smålag.</p>
      </Link>
      {/* <Menu orientation="desktop" /> */}
      <div className="flex gap-2">
        <Link href="/register">
          <Button
            variant="outline"
            className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
          >
            <Logout />
            Login
          </Button>
        </Link>
        {/* <GlassSheet
          triggerClass="lg:hidden"
          trigger={
            <Button variant="ghost" className="hover:bg-transparent">
              <MenuIcon size={30} />
            </Button>
          }
        >
          <Menu orientation="mobile" />
        </GlassSheet> */}
      </div>
    </div>
  );
};

export default LandingPageNavbar;
