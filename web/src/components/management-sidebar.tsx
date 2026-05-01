import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";

// Import configs
import { RouteConfigs } from "@/config/routes";

// Import components
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export type TNavMenuItem = {
  title: string;
  url: string;
  childrens: TNavMenuItem[];
  isActive?: string;
};

export const navData = {
  navMain: [
    {
      title: "Main Menu",
      url: "/",
      childrens: [
        {
          title: "Home",
          url: RouteConfigs.Home.Path,
        },
        {
          title: "Collections",
          url: RouteConfigs.Collection.Prefix,
        },
        {
          title: "My Profile",
          url: RouteConfigs.Profile.Prefix,
        },
      ],
    },
    {
      title: "Account",
      url: "#",
      childrens: [
        {
          title: "Settings",
          url: RouteConfigs.Setting.Prefix,
        },
      ],
    },
  ] as TNavMenuItem[],
};

export function ManagementSidebar({
  setCurrentNavTitle,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  setCurrentNavTitle(title: string): void;
}) {
  const location = useLocation();

  const matchTitleRef = useRef("");

  useEffect(() => {
    setCurrentNavTitle(matchTitleRef.current);
  }, [location.pathname]);

  return (
    <Sidebar {...props} className="absolute">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {navData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.childrens.map((child) => {
                  const isActive = location.pathname === child.url;

                  if (isActive) {
                    matchTitleRef.current = child.title;
                  }

                  return (
                    <SidebarMenuItem key={child.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link to={child.url}>{child.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
