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
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b px-4 py-3 bg-background">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-full"
          />
          <h1>{currentNavTitle}</h1>
        </header>
        <div className="@container/main flex flex-col gap-4 p-4 h-[calc(100dvh-57px)] overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
