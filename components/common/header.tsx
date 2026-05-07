import { Suspense } from "react";
import {
  BuildingIcon,
  CompassIcon,
  GemIcon,
  HomeIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import CustomUserButton from "./custom-user-button";

// 1. Your Logo stays exactly the same
const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
        <SparklesIcon className="size-4 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold">
        sos<span className="text-primary">Built</span>This
      </span>
    </Link>
  );
};

const SignUpBTN = () => {
  return (
    <Button className="bg-primary text-primary-foreground font-medium text-sm sm:text-base h-10 px-4 sm:px-5 cursor-pointer hover:bg-secondary hover:text-secondary-foreground transition-colors">
      Sign Up
    </Button>
  );
};
const SignInBTN = () => {
  return (
    <Button
      variant={"ghost"}
      className="font-medium text-sm sm:text-base h-10 px-4 sm:px-5 cursor-pointer"
    >
      Sign In
    </Button>
  );
};

// 2. The AuthArea ONLY handles the logged-in/logged-out buttons.
// Because it is async, we can safely wait for Clerk here.
async function AuthArea() {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  if (isSignedIn) {
    return (
      <>
        <Button asChild>
          <Link href="/submit">
            <GemIcon className="size-4" />
            Submit Project
          </Link>
        </Button>
        {/* The Clerk Profile Picture Dropdown */}
        <CustomUserButton />
      </>
    );
  }

  return (
    <>
      <SignInButton>
        <SignInBTN />
      </SignInButton>
      <SignUpButton>
        <SignUpBTN />
      </SignUpButton>
    </>
  );
}

// 3. Your main Header is now a normal, instant-loading component!
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper px-12">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
            >
              <HomeIcon className="size-6" />
              <span>Home</span>
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
            >
              <CompassIcon className="size-6" />
              <span>Explore</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* 
              4. We wrap ONLY the AuthArea in Suspense! 
              The rest of your header loads instantly, while the buttons show 
              a smooth grey pulsing shape for a split second while verifying login.
            */}
            <Suspense
              fallback={
                <div className="h-10 w-24 bg-muted animate-pulse rounded-full" />
              }
            >
              <AuthArea />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
