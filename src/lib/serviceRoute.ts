export const SERVICE_PAGE_KEY = "service";
export const SERVICE_PAGE_HASH = "#service";
export const SERVICE_PAGE_PATH = "/service";
export const HOMEPAGE_PATH = "/";

export const LEGACY_SERVICE_PAGE_KEY = "services-page";
export const LEGACY_SERVICE_PAGE_HASH = "#services-page";
export const LEGACY_SERVICE_PAGE_PATH = "/services-page";

export const APP_NAVIGATION_EVENT = "hierys:navigation";

const SERVICE_PAGE_HASHES = new Set([
  SERVICE_PAGE_HASH,
  LEGACY_SERVICE_PAGE_HASH,
]);

const SERVICE_PAGE_PATHS = new Set([
  SERVICE_PAGE_PATH,
  LEGACY_SERVICE_PAGE_PATH,
]);

export const isServicePageRoute = (
  location: Pick<Location, "hash" | "pathname">,
) =>
  SERVICE_PAGE_HASHES.has(location.hash) ||
  SERVICE_PAGE_PATHS.has(location.pathname);

export const canonicalizeServicePageLocation = (
  location: Pick<Location, "hash" | "pathname">,
) =>
  location.hash === SERVICE_PAGE_HASH ||
  location.pathname === SERVICE_PAGE_PATH;

const dispatchAppNavigation = () => {
  window.dispatchEvent(new Event(APP_NAVIGATION_EVENT));
};

export const navigateToServicePage = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (window.location.pathname === SERVICE_PAGE_PATH && !window.location.hash) {
    dispatchAppNavigation();
    return;
  }

  window.history.pushState({}, "", SERVICE_PAGE_PATH);
  dispatchAppNavigation();
};

export const navigateToHomepage = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (window.location.pathname !== HOMEPAGE_PATH || window.location.hash) {
    window.history.pushState({}, "", HOMEPAGE_PATH);
  }

  dispatchAppNavigation();
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
};

export const replaceWithCanonicalServicePageRoute = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (!isServicePageRoute(window.location)) {
    return false;
  }

  if (canonicalizeServicePageLocation(window.location)) {
    return false;
  }

  window.history.replaceState({}, "", SERVICE_PAGE_PATH);
  return true;
};

export const INNER_SERVICE_PREFIX = `${SERVICE_PAGE_PATH}/`;

export const slugifyServiceTitle = (title: string): string =>
  title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const buildInnerServicePath = (title: string): string =>
  `${INNER_SERVICE_PREFIX}${slugifyServiceTitle(title)}`;

export const isInnerServiceRoute = (
  location: Pick<Location, "pathname">,
): boolean =>
  location.pathname.startsWith(INNER_SERVICE_PREFIX) &&
  location.pathname.length > INNER_SERVICE_PREFIX.length;

export const isInnerServicePath = (path: string): boolean =>
  path.startsWith(INNER_SERVICE_PREFIX) &&
  path.length > INNER_SERVICE_PREFIX.length;

export const getInnerServiceSlug = (
  location: Pick<Location, "pathname">,
): string | null => {
  if (!isInnerServiceRoute(location)) return null;
  return location.pathname.slice(INNER_SERVICE_PREFIX.length);
};

export const navigateToInnerService = (path: string): void => {
  if (typeof window === "undefined") return;
  if (window.location.pathname === path && !window.location.hash) {
    dispatchAppNavigation();
    return;
  }
  window.history.pushState({}, "", path);
  dispatchAppNavigation();
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
};
