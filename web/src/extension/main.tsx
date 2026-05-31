import { MemoryRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "@/shared/index.css";

// Import components
import { Toaster } from "@/shared/components/ui/sonner";
import { ThemeProvider } from "@/shared/components/theme-provider.tsx";
import ConfirmDeleteDialog from "@/shared/components/confirm-delete-dialog.tsx";

import { queryClient } from "@/shared/config/query-client.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster id="global" position="top-center" richColors />
      <MemoryRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </MemoryRouter>
      <ConfirmDeleteDialog />
    </QueryClientProvider>
  </StrictMode>
);
