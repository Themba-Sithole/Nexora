import { createBrowserRouter } from "react-router";
import { SiteLayout } from "../components/SiteLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import("../pages/HomePage")).default }),
      },
      {
        path: "projects",
        lazy: async () => ({ Component: (await import("../pages/ProjectsPage")).default }),
      },
      {
        path: "services",
        lazy: async () => ({ Component: (await import("../pages/ServicesPage")).default }),
      },
    ],
  },
]);
