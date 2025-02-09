import { AppProviderContext } from "@/components/app-context-provider";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppProviderContext>
          <div className="min-h-screen max-h-screen w-screen overflow-auto flex flex-col">
            <Navbar />
            <Outlet />
            <Footer />
          </div>
        </AppProviderContext>
      </ThemeProvider>
      <Toaster richColors position="bottom-right" />
    </>
  ),
});
