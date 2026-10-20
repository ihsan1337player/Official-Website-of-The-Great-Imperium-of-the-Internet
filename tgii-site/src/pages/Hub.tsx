import { useUser } from "@clerk/react";
import { Link } from "wouter";
import {
  useListMembers,
  useGetMyProfile,
  useJoinImperium,
  useUpdateMemberRank,
  useBanMember,
  getListMembersQueryKey,
  getGetMyProfileQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Crown, Shield, Star, Lock } from "lucide-react";

const HEAD_ADMIN_RANKS = new Set([
  "Imperial High Senate",
  "Imperial Head of High Senate",
  "Imperator",
]);

const RANKS = [
  "Group Recruit",
  "Group Specialist",
  "Group Sergeant",
  "Group Major Sergeant",
  "Group Commander",
  "Group General",
  "Group Vice Director",
  "Group Director",
  "Imperial Scribe",
  "Imperial Adept",
  "Imperial Praesaepe",
  "Imperial Major",
  "Imperial Operations Dominus",
  "Imperial Master Command",
  "Imperial High Senate",
  "Imperial Head of High Senate",
  "Imperator"
];

function getRankTier(rank: string) {
  const highCommand = ["Imperial High Senate", "Imperial Head of High Senate", "Imperator"];
  const executive = ["Imperial Scribe", "Imperial Adept", "Imperial Praesaepe", "Imperial Major", "Imperial Operations Dominus", "Imperial Master Command"];
  
  if (rank === "Imperator") return "imperator";
  if (highCommand.includes(rank)) return "high-command";
  if (executive.includes(rank)) return "executive";
  return "in-group";
}

function RankBadge({ rank }: { rank: string }) {
  const tier = getRankTier(rank);
  let colorClass = "bg-primary text-secondary border-primary/50"; // in-group (muted crimson)
  
  if (tier === "imperator") {
    colorClass = "bg-secondary text-primary border-secondary shadow-[0_0_15px_rgba(245,197,24,0.4)] scale-105 font-black";
  } else if (tier === "high-command") {
    colorClass = "bg-secondary text-primary border-secondary font-black";
  } else if (tier === "executive") {
    colorClass = "bg-primary text-secondary border-secondary/50 font-bold";
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs uppercase tracking-widest border-2 ${colorClass}`}>
      {rank}
    </span>
  );
}

function Avatar({ src, fallback }: { src?: string | null, fallback: string }) {
  return (
    <div className="w-12 h-12 rounded-full border-2 border-secondary bg-primary/10 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
      {src ? (
        <img src={src} alt={fallback} className="w-full h-full object-cover" />
      ) : (
        <span className="text-primary font-serif font-bold text-xl">{fallback.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}

function BigAvatar({ src, fallback }: { src?: string | null, fallback: string }) {
  return (
    <div className="w-24 h-24 rounded-full border-4 border-secondary shadow-lg bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
      {src ? (
        <img src={src} alt={fallback} className="w-full h-full object-cover" />
      ) : (
        <span className="text-primary font-serif font-bold text-4xl">{fallback.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}

function HubContent() {
  const { user, isLoaded } = useUser();
  const qc = useQueryClient();
  
  const profileQuery = useGetMyProfile({ 
    query: { 
      retry: false, 
      enabled: !!user,
      queryKey: getGetMyProfileQueryKey()
    } 
  });
  
  const membersQuery = useListMembers({ 
    query: { 
      enabled: !!user,
      queryKey: getListMembersQueryKey()
    } 
  });
  
  const joinMutation = useJoinImperium({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getGetMyProfileQueryKey() });
        qc.invalidateQueries({ queryKey: getListMembersQueryKey() });
      }
    }
  });

  const updateRankMutation = useUpdateMemberRank({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListMembersQueryKey() });
      }
    }
  });

  const banMutation = useBanMember({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListMembersQueryKey() });
      }
    }
  });

  if (!isLoaded) {
    return (
      <div className="p-20 text-center flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-primary uppercase tracking-widest font-bold">Verifying Credentials...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="bg-white border-4 border-primary p-12 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-secondary" />
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-serif font-bold text-primary mb-4 uppercase tracking-widest">[ TGII ]</h1>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Imperial Member Registry</h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Identify yourself to access the registry, view the roster, and review your rank within the Imperium.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-in" className="w-full sm:w-auto px-8 py-3 bg-primary text-secondary font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors border-2 border-transparent">
              Sign In
            </Link>
            <Link href="/sign-up" className="w-full sm:w-auto px-8 py-3 bg-white text-primary border-2 border-primary font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors">
              Join the Imperium
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (profileQuery.isLoading) {
    return (
      <div className="p-20 text-center flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-primary uppercase tracking-widest font-bold">Loading Imperial Profile...</p>
      </div>
    );
  }

  if (profileQuery.isError) {
    const errorStatus = (profileQuery.error as any)?.status;
    if (errorStatus === 403) {
      return (
        <div className="max-w-2xl mx-auto py-20 px-4 text-center">
          <div className="bg-primary border-4 border-secondary p-12 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-secondary" />
            <Lock className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-secondary mb-4 uppercase tracking-widest">Banned from the Imperium</h2>
            <p className="text-secondary/80 mb-10 text-lg font-medium">
              You have been permanently expelled from The Great Imperium of the Internet. You may no longer view the roster or participate in Imperial activities.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="bg-white border-4 border-primary p-12 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-secondary" />
          <h2 className="text-3xl font-serif font-bold text-primary mb-4 uppercase tracking-widest">Pledge Allegiance</h2>
          <p className="text-muted-foreground mb-10 text-lg">
            You are recognized by the system, but have not yet sworn fealty to The Great Imperium of the Internet.
          </p>
          <button 
            onClick={() => joinMutation.mutate({ 
              data: { 
                username: user.username || user.firstName || "Imperial Recruit", 
                avatarUrl: user.imageUrl || null 
              } 
            })}
            disabled={joinMutation.isPending}
            className="px-8 py-4 bg-primary text-secondary font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors border-2 border-secondary text-lg disabled:opacity-50"
          >
            {joinMutation.isPending ? "Pledging..." : "Join the Imperium"}
          </button>
        </div>
      </div>
    );
  }

  const profile = profileQuery.data;

  if (!profile) return null;

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <div className="bg-white border-2 border-primary p-6 shadow-md flex items-center gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-primary/5 rounded-bl-full -z-10" />
        <div className="absolute right-8 bottom-8 text-primary/10">
          <Shield className="w-32 h-32" />
        </div>
        <BigAvatar src={user.imageUrl || profile.avatarUrl} fallback={profile.username} />
        <div className="z-10">
          <h2 className="text-3xl font-serif font-bold text-primary mb-3 flex items-center gap-3">
            {profile.username}
            {profile.isHeadAdmin && <span title="Head Administrator"><Star className="w-6 h-6 text-secondary fill-secondary" /></span>}
            {profile.isAdmin && !profile.isHeadAdmin && <span title="Imperial Administrator"><Crown className="w-5 h-5 text-secondary" /></span>}
          </h2>
          <div className="mb-4">
            <RankBadge rank={profile.rank} />
          </div>
          <p className="text-sm text-muted-foreground font-mono bg-gray-100 inline-block px-3 py-1 border border-border">
            PLEDGED: {new Date(profile.joinedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Roster List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-primary text-primary-foreground px-6 py-3 shadow-sm border-b-4 border-secondary">
            <h3 className="font-serif font-bold tracking-widest uppercase text-lg">Member Roster</h3>
            <span className="font-mono font-bold bg-black/20 px-3 py-1 border border-secondary/30">
              {membersQuery.data?.length || 0} Records
            </span>
          </div>

          {membersQuery.isLoading ? (
            <div className="p-12 text-center text-muted-foreground border-2 border-dashed border-border">
              Fetching roster data...
            </div>
          ) : (
            <div className="space-y-3">
              {membersQuery.data?.map((member, i) => {
                const isBanned = member.isBanned;
                return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={member.userId} 
                  className={`bg-white border-2 p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm transition-all hover:shadow-md gap-4 ${
                    isBanned ? 'opacity-60 border-primary bg-primary/5 grayscale-[50%]' :
                    member.userId === profile.userId ? 'border-secondary bg-yellow-50/30' : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Avatar src={member.avatarUrl} fallback={member.username} />
                    <div>
                      <div className="font-bold text-foreground flex items-center gap-2 text-lg">
                        {member.username}
                        {member.isHeadAdmin && <span title="Head Administrator"><Star className="w-4 h-4 text-secondary fill-secondary" /></span>}
                        {member.isAdmin && !member.isHeadAdmin && <span title="Imperial Administrator"><Crown className="w-4 h-4 text-secondary" /></span>}
                        {isBanned && <span className="text-[10px] font-bold uppercase bg-primary text-secondary px-2 py-0.5 tracking-wider">Banned</span>}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        PLEDGED: {new Date(member.joinedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <RankBadge rank={member.rank} />
                    {/* Head admins can edit anyone; regular admins can only edit non-head-admins */}
                    <div className="flex items-center gap-2">
                      {profile.isAdmin && member.userId !== profile.userId &&
                        (profile.isHeadAdmin || !member.isHeadAdmin) && (
                        <select
                          className="bg-gray-50 border border-border text-xs p-1 outline-none focus:border-primary font-mono text-muted-foreground w-full sm:w-auto"
                          value={member.rank}
                          onChange={(e) => {
                            updateRankMutation.mutate({
                              userId: member.userId,
                              data: { rank: e.target.value }
                            });
                          }}
                          disabled={updateRankMutation.isPending}
                        >
                          {/* Regular admins can't assign head admin ranks */}
                          {RANKS.filter(r => profile.isHeadAdmin || !HEAD_ADMIN_RANKS.has(r))
                            .map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      )}
                      
                      {profile.isAdmin && member.userId !== profile.userId &&
                        (profile.isHeadAdmin || !member.isHeadAdmin) && (
                        <button
                          onClick={() => {
                            banMutation.mutate({
                              userId: member.userId,
                              data: { isBanned: !isBanned }
                            });
                          }}
                          disabled={banMutation.isPending}
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 border transition-colors ${
                            isBanned 
                              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                              : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                          }`}
                        >
                          {isBanned ? "Unban" : "Ban"}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
                );
              })}
              
              {membersQuery.data?.length === 0 && (
                <div className="p-12 text-center text-muted-foreground border-2 border-dashed border-border bg-white">
                  No members found in the registry.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rank Guide Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-border p-5 sticky top-24 shadow-sm">
            <h3 className="font-serif font-bold text-primary border-b-2 border-primary/20 pb-3 mb-5 uppercase tracking-widest">Rank Guide</h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold text-secondary bg-primary px-3 py-1 mb-3 inline-block uppercase tracking-wider">High Command</h4>
                <ul className="text-xs space-y-2 font-mono text-foreground font-bold">
                  <li>Imperator</li>
                  <li>Imperial Head of High Senate</li>
                  <li>Imperial High Senate</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary bg-secondary px-3 py-1 mb-3 inline-block uppercase tracking-wider">Executive</h4>
                <ul className="text-xs space-y-2 font-mono text-muted-foreground font-semibold">
                  <li>Imperial Master Command</li>
                  <li>Imperial Operations Dominus</li>
                  <li>Imperial Major</li>
                  <li>Imperial Praesaepe</li>
                  <li>Imperial Adept</li>
                  <li>Imperial Scribe</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 mb-3 inline-block uppercase tracking-wider">In-Group</h4>
                <ul className="text-xs space-y-2 font-mono text-muted-foreground">
                  <li>Group Director</li>
                  <li>Group Vice Director</li>
                  <li>Group General</li>
                  <li>Group Commander</li>
                  <li>Group Major Sergeant</li>
                  <li>Group Sergeant</li>
                  <li>Group Specialist</li>
                  <li>Group Recruit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hub() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50/50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 border-b-4 border-primary pb-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary uppercase tracking-widest">Imperial Hub</h1>
          <p className="text-muted-foreground font-bold tracking-wider uppercase mt-3">Official Roster & Registry</p>
        </div>
        <HubContent />
      </div>
    </div>
  );
}