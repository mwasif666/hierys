import { useEffect, useState } from "react";
import Homepage from "@/components/homepage/Homepage";
import ScopeOfServicePage from "@/components/services/ScopeOfServicePage";
import { Toaster } from "@/components/ui/sonner";
import {
  APP_NAVIGATION_EVENT,
  isServicePageRoute,
  replaceWithCanonicalServicePageRoute,
} from "@/lib/serviceRoute";

export default function App() {
  const [isServicePage, setIsServicePage] = useState(
    () => typeof window !== "undefined" && isServicePageRoute(window.location),
  );

  useEffect(() => {
    const syncRoute = () => {
      const shouldShowServicePage = isServicePageRoute(window.location);

      if (shouldShowServicePage) {
        replaceWithCanonicalServicePageRoute();
      }

      setIsServicePage(shouldShowServicePage);
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
      {isServicePage ? <ScopeOfServicePage /> : <Homepage />}
      <Toaster />
    </>
  );
}
