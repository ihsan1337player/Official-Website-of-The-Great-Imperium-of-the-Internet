import { Link, useLocation } from "wouter";
import { Show, useClerk, useUser } from "@clerk/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/laws", label: "Laws" },
  { href: "/announcements", label: "Announcements" },
  { href: "/rank-structure", label: "Rank Structure" },
  { href: "/hub", label: "Hub" }
];

export function NavBar() {
  const [location] = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <nav className="bg-primary text-primary-foreground border-b-4 border-secondary sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-serif font-bold text-2xl tracking-widest text-secondary hover:text-white transition-colors">
            <Link href="/">[ TGII ]</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-bold tracking-wider uppercase transition-all ${
                      isActive
                        ? "bg-secondary text-primary shadow-sm border-b-2 border-primary"
                        : "text-primary-foreground hover:bg-secondary/20 hover:text-secondary border-b-2 border-transparent"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Show when="signed-out">
              <Link href="/sign-in" className="text-sm font-bold uppercase tracking-wider text-primary-foreground hover:text-secondary transition-colors">
                Sign In
              </Link>
              <Link href="/sign-up" className="bg-secondary text-primary px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors border-2 border-transparent hover:border-secondary">
                Join
              </Link>
            </Show>
            <Show when="signed-in">
              <span className="text-sm font-bold uppercase tracking-wider text-secondary">
                {user?.username || user?.firstName}
              </span>
              <button 
                onClick={() => signOut()}
                className="text-sm font-bold uppercase tracking-wider text-primary-foreground hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </Show>
          </div>

          {/* Mobile menu fallback for small screens (simplified) */}
          <div className="md:hidden flex items-center gap-4">
             <Show when="signed-out">
                <Link href="/sign-in" className="text-xs font-bold uppercase tracking-wider text-secondary">Sign In</Link>
             </Show>
             <Show when="signed-in">
                <button onClick={() => signOut()} className="text-xs font-bold uppercase tracking-wider text-secondary">Sign Out</button>
             </Show>
          </div>
        </div>
      </div>
      {/* Mobile nav links */}
      <div className="md:hidden flex overflow-x-auto bg-primary border-t border-primary-foreground/20">
         {links.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex-shrink-0 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-all ${
                  isActive
                    ? "bg-secondary text-primary"
                    : "text-primary-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
      </div>
    </nav>
  );
}
