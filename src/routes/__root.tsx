import Navbar from "@/components/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen max-h-screen w-screen overflow-auto">
          <Navbar />
          <Outlet />
        </div>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  ),
});
