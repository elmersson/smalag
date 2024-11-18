import { Button } from "@/components/ui/button";
import Link from "next/link";

const UnAuthenticatedErrorPage = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="font-bold text-base text-red-400">Error</h5>
        <p className="text-themeTextGray leading-tight">
          Oops! Something went wrong!
        </p>
      </div>
      <Link href="/login">
        <Button className="w-full mt-4">Go back</Button>
      </Link>
    </div>
  );
};

export default UnAuthenticatedErrorPage;
