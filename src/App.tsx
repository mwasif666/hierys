import { useEffect, useState } from "react";
import Homepage from "@/components/homepage/Homepage";
import ScopeOfServicePage from "@/components/services/ScopeOfServicePage";
import { Toaster } from "@/components/ui/sonner";

const SERVICE_PAGE_HASH = "#services-page";

export default function App() {
  const [currentHash, setCurrentHash] = useState(
    typeof window !== "undefined" ? window.location.hash : "",
  );

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      {currentHash === SERVICE_PAGE_HASH ? (
        <ScopeOfServicePage />
      ) : (
        <Homepage />
      )}
      <Toaster />
    </>
  );
}
