import { useState } from "react";
import { Outlet } from "react-router";

import { ManagementSidebar } from "@/components/management-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout() {
  const [currentNavTitle, setCurrentNavTitle] = useState("");

  return (
    <SidebarProvider className="flex relative">
      <ManagementSidebar setCurrentNavTitle={setCurrentNavTitle} />
      <SidebarInset className="flex-1 max-h-full overflow-y-auto">
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1>{currentNavTitle}</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
