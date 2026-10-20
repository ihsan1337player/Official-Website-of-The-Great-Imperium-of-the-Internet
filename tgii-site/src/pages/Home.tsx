import { Link } from "wouter";
import flagImage from "@assets/Crimson_Roman_1785691440003.png";
import kzannnImage from "@assets/IMG_1301_1785691771847.jpeg";
import ihsanAppleImage from "@assets/IMG_1285_1785691923747.jpeg";
import ihsanBadgeImage from "@assets/Untitled_design_8_1785691932629.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Header/Hero */}
      <section className="bg-white py-20 px-4 text-center border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="mx-auto w-full max-w-[28rem] overflow-hidden border-4 border-secondary mb-6 shadow-lg">
            <img
              src={flagImage}
              alt="The Great Imperium of the Internet flag"
              className="block w-full h-auto"
            />
          </div>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">(Our Flag)</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 leading-tight max-w-3xl mx-auto">
            Welcome to the official site for The Great Imperium of the Internet
          </h1>
          <Link
            href="/hub"
            className="inline-block bg-primary text-secondary font-serif font-bold text-xl px-10 py-4 border-4 border-secondary shadow-lg uppercase tracking-widest hover:bg-secondary hover:text-primary transition-colors duration-200"
          >
            Join Main Hub
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 bg-gray-50 flex-grow">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="bg-white p-8 border border-border shadow-md rounded-sm border-l-4 border-l-primary">
            <h2 className="text-2xl font-serif font-bold text-secondary mb-6 bg-primary inline-block px-4 py-1">Who are we?</h2>
            <p className="text-lg text-foreground leading-relaxed">
              We are an internet clan/organization whose purpose is to govern and keep the internet in check. We are especially against furries and woke content directed toward minors.
            </p>
          </div>

          <div className="bg-white p-8 border border-border shadow-md rounded-sm border-l-4 border-l-primary">
            <h2 className="text-2xl font-serif font-bold text-secondary mb-6 bg-primary inline-block px-4 py-1">How do i join?</h2>
            <p className="text-lg text-foreground leading-relaxed mb-4">
              To join and climb the ranks in TGII, you simply just need to join the main hub on the website and then search for a group within your game/platform that has the official TGII seal in its title or anywhere inside the group.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Once you joined, its required to check the site daily for <Link href="/announcements" className="text-primary font-bold hover:underline hover:text-secondary transition-colors">announcements</Link>. You do not need discord or any social media to join, all you need is the game.
            </p>
            <div className="inline-block bg-primary text-secondary px-6 py-3 font-serif font-bold text-xl border-2 border-secondary shadow-sm">
              Seal: [TGII]
            </div>
          </div>

          <div className="bg-white p-8 border border-border shadow-md rounded-sm border-l-4 border-l-primary">
            <h2 className="text-2xl font-serif font-bold text-secondary mb-6 bg-primary inline-block px-4 py-1">What if there isnt a group?</h2>
            <p className="text-lg text-foreground leading-relaxed mb-4">
              If there isnt any kind of organized group in your game, you will need to create your own. If you make a group, you will automatically be appointed <strong className="text-primary">Group Director</strong>.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-4">
              For your group to be officially recognized, You need to insert the seal: <strong className="text-primary">[TGII]</strong>. Any member of any rank can make a new group. Every official group must follow TGIIs beliefs and in group <Link href="/rank-structure" className="text-primary font-bold hover:underline hover:text-secondary transition-colors">rank structure</Link>.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              Groups can make special units like special forces or other non standard units.
            </p>
          </div>
          
          <div className="text-center py-8">
            <p className="text-xl font-serif italic text-muted-foreground">
              "so ye gl to ur journey and uh have fun ig trolling furries or smth"
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Leadership */}
      <footer className="bg-primary text-primary-foreground py-16 border-t-8 border-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0,transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-3xl font-serif font-bold text-secondary mb-10 uppercase tracking-widest inline-block border-b-2 border-secondary/50 pb-4">Imperial Leadership</h3>
          
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="bg-black/30 p-8 rounded-sm border border-secondary/30 shadow-inner backdrop-blur-sm transform transition-transform hover:-translate-y-1">
              <img
                src={kzannnImage}
                alt="kzannn"
                className="mx-auto mb-6 h-48 w-48 rounded-sm border-2 border-secondary object-cover object-top shadow-lg"
              />
              <h4 className="text-2xl font-bold text-white mb-2">kzannn</h4>
              <p className="text-secondary font-serif mb-6 uppercase tracking-wider text-sm font-bold">Imperial Head of High Senate</p>
              <div className="flex flex-wrap justify-center gap-3 text-sm text-primary-foreground/90 font-mono">
                <span className="bg-black/50 px-4 py-2 rounded-sm border border-secondary/10">kzannn@roblox.com</span>
                <span className="bg-black/50 px-4 py-2 rounded-sm border border-secondary/10">kzannn123@youtube.com</span>
              </div>
            </div>

            <div className="bg-black/30 p-8 rounded-sm border border-secondary/30 shadow-inner backdrop-blur-sm transform transition-transform hover:-translate-y-1">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
                <img
                  src={ihsanAppleImage}
                  alt="ihsan1337player apple emblem"
                  className="h-32 w-32 rounded-sm border-2 border-secondary object-cover shadow-lg"
                />
                <img
                  src={ihsanBadgeImage}
                  alt="ihsan1337player badge emblem"
                  className="h-32 w-32 rounded-sm border-2 border-secondary object-cover shadow-lg"
                />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">ihsan1337player</h4>
              <p className="text-secondary font-serif mb-6 uppercase tracking-wider text-sm font-bold">Imperator</p>
              <div className="flex flex-wrap justify-center gap-3 text-sm text-primary-foreground/90 font-mono">
                <span className="bg-black/50 px-4 py-2 rounded-sm border border-secondary/10">ihsan1337player@steam</span>
                <span className="bg-black/50 px-4 py-2 rounded-sm border border-secondary/10">ihsan1337player@geometrydash</span>
                <span className="bg-black/50 px-4 py-2 rounded-sm border border-secondary/10">ihsaniffan@roblox.com</span>
                <span className="bg-black/50 px-4 py-2 rounded-sm border border-secondary/10">ihsan1337player@reddit.com</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
