type AnalyticsParams = Record<string, string | number | boolean | undefined>;

const sendGAEvent = (eventName: string, params: AnalyticsParams = {}) => {
    if (typeof window === "undefined") return;

    const gtag = (
        window as Window & {
            gtag?: (...args: unknown[]) => void;
        }
    ).gtag;

    if (typeof gtag !== "function") return;

    gtag("event", eventName, params);
};

export const trackMenuOpen = () => {
    sendGAEvent("menu_open");
};

export const trackNavigationClick = (
    navigationItem: string,
    destination: string
) => {
    sendGAEvent("navigation_click", {
        navigation_item: navigationItem,
        destination,
    });
};

export const trackProjectClick = (projectName: string, projectSlug: string) => {
    sendGAEvent("project_click", {
        project_name: projectName,
        project_slug: projectSlug,
    });
};

export const trackProjectExternalClick = (
    projectName: string,
    projectSlug: string,
    linkUrl: string
) => {
    sendGAEvent("project_external_click", {
        project_name: projectName,
        project_slug: projectSlug,
        link_url: linkUrl,
    });
};

export const trackProjectNavigation = (
    direction: "prev" | "next" | "index",
    projectSlug: string,
    destination: string
) => {
    sendGAEvent("project_navigation", {
        direction,
        project_slug: projectSlug,
        destination,
    });
};
