import { useEffect, useRef, useState } from "react";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import { Switch, Route, useLocation, Redirect, Router as WouterRouter, Link } from 'wouter';
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { NavBar } from './components/NavBar';
import NotFound from '@/pages/not-found';
import Home from './pages/Home';
import Announcements from './pages/Announcements';
import Laws from './pages/Laws';
import RankStructure from './pages/RankStructure';
import Hub from './pages/Hub';

const queryClient = new QueryClient();

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#8B0000",
    colorForeground: "#1a0000",
    colorMutedForeground: "#6b2222",
    colorDanger: "#cc0000",
    colorBackground: "#ffffff",
    colorInput: "#fff8f0",
    colorInputForeground: "#1a0000",
    colorNeutral: "#8B0000",
    fontFamily: "'Playfair Display', Georgia, serif",
    borderRadius: "0px",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-white border-4 border-[#8B0000] w-[440px] max-w-full overflow-hidden shadow-2xl",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-[#8B0000] font-serif font-bold",
    headerSubtitle: "text-[#6b2222]",
    socialButtonsBlockButtonText: "text-[#1a0000] font-semibold",
    formFieldLabel: "text-[#8B0000] font-semibold uppercase tracking-wider text-xs",
    footerActionLink: "text-[#8B0000] font-bold hover:text-[#F5C518]",
    footerActionText: "text-[#6b2222]",
    dividerText: "text-[#6b2222]",
    identityPreviewEditButton: "text-[#8B0000]",
    formFieldSuccessText: "text-green-700",
    alertText: "text-[#cc0000]",
    logoBox: "flex justify-center mb-2",
    logoImage: "h-12 w-auto",
    socialButtonsBlockButton: "border-2 border-[#8B0000] bg-white hover:bg-[#fff0f0]",
    formButtonPrimary: "bg-[#8B0000] text-[#F5C518] hover:bg-[#6b0000] font-bold uppercase tracking-widest border-2 border-[#F5C518]",
    formFieldInput: "border-2 border-[#8B0000] bg-[#fff8f0] text-[#1a0000] focus:ring-[#8B0000]",
    footerAction: "bg-[#fff8f0] border-t-2 border-[#8B0000]",
    dividerLine: "bg-[#8B0000]/20",
    alert: "border-[#cc0000] bg-[#fff0f0]",
    otpCodeFieldInput: "border-2 border-[#8B0000]",
    formFieldRow: "",
    main: "",
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#8B0000] uppercase tracking-widest">[ TGII ]</h1>
          <p className="text-[#6b2222] text-sm mt-1 uppercase tracking-wider">Imperial Registry</p>
        </div>
        <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
      </div>
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#8B0000] uppercase tracking-widest">[ TGII ]</h1>
          <p className="text-[#6b2222] text-sm mt-1 uppercase tracking-wider">Join the Imperial Registry</p>
        </div>
        <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
      </div>
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    const unsub = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsub;
  }, [addListener, qc]);
  return null;
}

function Router() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <NavBar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/announcements" component={Announcements} />
          <Route path="/laws" component={Laws} />
          <Route path="/rank-structure" component={RankStructure} />
          <Route path="/hub" component={Hub} />
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/sign-up/*?" component={SignUpPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: { start: { title: "Imperial Sign In", subtitle: "Access the Imperial Registry" } },
        signUp: { start: { title: "Join the Imperium", subtitle: "Create your imperial account" } },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ClerkQueryClientCacheInvalidator />
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
