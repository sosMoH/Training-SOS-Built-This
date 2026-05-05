import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "../ui/icons";


const Logo = () => {
  return (
    // Added mb-4 to match the tutorial spacing
    <Link href="/" className="flex items-center gap-2 mb-4 group">
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
        <SparklesIcon className="size-4 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold">
        sos<span className="text-primary">Built</span>This
      </span>
    </Link>
  );
};

export default function Footer() {
  return (
    // Cleaned up the outer footer classes to match the tutorial
    <footer className="border-t bg-muted/20 py-12">
      <div className="wrapper">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Bio: Made this span 2 columns on medium screens */}
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="text-muted-foreground text-sm max-w-xs">
              A personal platform where I share what I've built and publish new
              launches.
            </p>
          </div>

          {/* Links: Separated into their own grid columns using ul/li for accessibility */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-foreground transition-colors" href="/explore">Explore</Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" href="/trending">Trending</Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" href="/submit">Submit Project</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">My Self</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-foreground transition-colors" href="/about">About</Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" href="/contact">Contact</Link>
              </li>
              <li>
                <Link className="hover:text-foreground transition-colors" href="/privacy">Privacy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Added mt-12, flex-col to sm:flex-row for mobile responsiveness */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 sosBuiltThis. All rights reserved.</p>
          
          {/* Social Icons with proper styling and hover effects */}
          <div className="flex items-center gap-4">
            <Link target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn" href="https://www.linkedin.com/in/moh-islam">
              <LinkedinIcon className="size-5" />
            </Link>
            <Link target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub" href="https://github.com/sosMoH">
              <GithubIcon className="size-5" />
            </Link>
            <Link target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram" href="https://www.instagram.com/sos__moh/instagram">
              <InstagramIcon className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}