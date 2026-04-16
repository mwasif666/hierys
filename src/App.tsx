import { useEffect, useState } from "react";
import Homepage from "@/components/homepage/Homepage";
import ScopeOfServicePage from "@/components/services/ScopeOfServicePage";
import InnerServicePage from "@/components/services/InnerServicePage";
import { Toaster } from "@/components/ui/sonner";
import {
  APP_NAVIGATION_EVENT,
  isServicePageRoute,
  isInnerServiceRoute,
  replaceWithCanonicalServicePageRoute,
} from "@/lib/serviceRoute";

type AppRoute = "home" | "service" | "innerService";

function resolveRoute(loc: Location): AppRoute {
  if (isInnerServiceRoute(loc)) return "innerService";
  if (isServicePageRoute(loc)) return "service";
  return "home";
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    typeof window !== "undefined" ? resolveRoute(window.location) : "home",
  );

  useEffect(() => {
    const syncRoute = () => {
      const next = resolveRoute(window.location);

      if (next === "service") {
        replaceWithCanonicalServicePageRoute();
      }

      setRoute(next);
    };

    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    window.addEventListener(APP_NAVIGATION_EVENT, syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener(APP_NAVIGATION_EVENT, syncRoute);
    };
  }, []);

  return (
    <>
      {route === "innerService" ? (
        <InnerServicePage />
      ) : route === "service" ? (
        <ScopeOfServicePage />
      ) : (
        <Homepage />
      )}
      <Toaster />
    </>
  );
}
