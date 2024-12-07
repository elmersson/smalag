import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div>
      <h1>Channel</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}
