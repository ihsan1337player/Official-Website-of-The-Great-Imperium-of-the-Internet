export default function RankStructure() {
  const inGroupRanks = [
    "Group Recruit",
    "Group Specialist",
    "Group Sergeant",
    "Group Major Sergeant",
    "Group Commander",
    "Group General",
    "Group Vice Director",
    "Group Director"
  ];

  const executiveRanks = [
    "Imperial Scribe",
    "Imperial Adept",
    "Imperial Praesaepe",
    "Imperial Major",
    "Imperial Operations Dominus",
    "Imperial Master Command"
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary bg-primary inline-block px-8 py-4 border-4 border-secondary shadow-xl uppercase tracking-widest">
            Rank Structure
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
          {/* In-Group Ranks */}
          <div className="bg-gray-50 p-8 border border-border shadow-md">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6 border-b-2 border-primary/20 pb-4 uppercase tracking-wider flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rotate-45 inline-block"></span>
              In-Group Ranks
            </h2>
            <p className="text-sm text-muted-foreground mb-8 italic bg-white p-3 border-l-2 border-primary/30">
              Standard ranks within a single game group (GLR/GMR/GHR).
            </p>
            <div className="space-y-4">
              {inGroupRanks.map((rank, i) => (
                <div key={i} className="flex items-center gap-4 text-foreground font-medium p-3 bg-white border border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                  <div className="w-6 text-center text-muted-foreground font-mono text-xs">{i + 1}</div>
                  <div className="w-2 h-2 bg-secondary rotate-45 flex-shrink-0"></div>
                  <span className="text-lg">{rank}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Ranks */}
          <div className="bg-primary text-primary-foreground p-8 border-4 border-secondary shadow-lg relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 opacity-[0.03] text-[15rem] font-serif translate-x-12 -translate-y-12 select-none pointer-events-none leading-none">
              TGII
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-secondary mb-6 border-b-2 border-secondary/20 pb-4 uppercase tracking-wider relative z-10 flex items-center gap-3">
              <span className="w-3 h-3 bg-secondary rotate-45 inline-block shadow-[0_0_8px_rgba(245,197,24,0.8)]"></span>
              Executive Genere Administrativi
            </h2>
            <p className="text-sm text-primary-foreground/90 mb-8 italic relative z-10 bg-black/20 p-3 border-l-2 border-secondary/50">
              These ranks are administrative ranks for running the imperium as a whole, not just one group, and they are ranked higher than every single in group rank.
            </p>
            <div className="space-y-4 relative z-10 flex-grow">
              {executiveRanks.map((rank, i) => (
                <div key={i} className="flex items-center gap-4 text-white font-medium p-3 bg-black/20 border border-secondary/10 hover:border-secondary/40 transition-colors backdrop-blur-sm">
                  <div className="w-6 text-center text-secondary/70 font-mono text-xs">{i + 1}</div>
                  <div className="w-2 h-2 bg-secondary flex-shrink-0 shadow-[0_0_5px_rgba(245,197,24,0.5)]"></div>
                  <span className="text-lg tracking-wide">{rank}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* High Command */}
        <div className="text-center py-16 px-4 bg-black text-white border-t-8 border-b-8 border-primary shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.5)_0,transparent_60%)]"></div>
          
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-secondary/50"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-secondary/50"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-secondary/50"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-secondary/50"></div>

          <h2 className="text-xl font-serif text-secondary mb-16 uppercase tracking-[0.3em] relative z-10 border-b border-secondary/30 inline-block pb-2">
            High Command
          </h2>
          
          <div className="space-y-16 relative z-10 flex flex-col items-center">
            <div className="transform transition-transform hover:scale-105 bg-white/5 px-12 py-6 border border-white/10 rounded-sm w-full max-w-xl">
              <div className="text-sm text-secondary/80 uppercase tracking-widest mb-2">Senate</div>
              <div className="text-2xl font-serif font-bold text-white tracking-wider">Imperial High Senate</div>
            </div>
            
            <div className="transform transition-transform hover:scale-105 bg-primary/20 px-12 py-8 border border-primary/50 rounded-sm w-full max-w-xl shadow-[0_0_30px_rgba(139,0,0,0.2)]">
              <div className="text-sm text-secondary/80 uppercase tracking-widest mb-2">Head of Senate</div>
              <div className="text-3xl font-serif font-bold text-secondary uppercase tracking-widest">Imperial Head of High Senate</div>
            </div>
            
            <div className="transform transition-transform hover:scale-105 mt-8 w-full">
              <div className="text-sm text-secondary uppercase tracking-[0.5em] mb-6 font-bold">Supreme Leader</div>
              <div className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F5C518] to-[#9A7B0A] uppercase tracking-[0.1em] filter drop-shadow-[0_5px_15px_rgba(245,197,24,0.4)]">
                IMPERATOR
              </div>
              <div className="mt-8 flex justify-center gap-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-3 h-3 bg-secondary rotate-45 ${i === 3 ? 'scale-150 shadow-[0_0_10px_rgba(245,197,24,1)]' : 'opacity-70'}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
