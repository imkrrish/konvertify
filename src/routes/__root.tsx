import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen max-h-screen w-screen overflow-auto flex flex-col">
          <Navbar />
          <Outlet />
        </div>
      </ThemeProvider>
    </>
  ),
});
