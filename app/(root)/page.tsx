import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

export default async function Home() {
  // const session = await auth();
  return (
    <div className="flex items-center justify-center gap-10 text-white">
      <div className="text-2xl font-bold">Hello World</div>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";

          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">
          <Link href={ROUTES.SIGN_IN}>Sign Out</Link>
        </Button>
      </form>
    </div>
  );
}
