import Link from "next/link";
import { Button } from "r/components/ui/button";

export default function LogIn() {
  return (
    <div className="m-16 flex flex-col items-center justify-center">
      <p>Please Log In to your account</p>
      <Link href="/api/auth/signin">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
