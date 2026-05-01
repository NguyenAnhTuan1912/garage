import { User, Plus, SearchIcon, Bell, Moon, Sun, Menu } from "lucide-react";
import { Link } from "react-router";

// Import route configs
import { RouteConfigs } from "@/routes/route-configs";

// Import components
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import EmptyNotification from "./empty-notification";

// Import hooks
import { useTheme } from "./theme-provider";
import { useResponsive } from "@/hooks/use-responsesive";

function DesktopNavigationBar() {
  const themeContext = useTheme();

  return (
    <nav className="h-full flex items-center gap-2">
      {/* Notification button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="relative cursor-pointer"
            variant="ghost"
            size="icon"
          >
            <Bell />
            <Badge
              className="absolute w-2 h-2 p-0 top-2 right-3"
              variant="destructive"
            />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <EmptyNotification />
        </SheetContent>
      </Sheet>

      <div className="w-[1px] bg-border h-4"></div>

      {/* Explore button */}
      <Button className="cursor-pointer" variant="ghost" asChild>
        <Link to={RouteConfigs.Explore.Path}>
          <p>Explore</p>
        </Link>
      </Button>

      <div className="w-[1px] bg-border h-4"></div>

      {/* Create note button */}
      <Button className="cursor-pointer" variant="ghost" asChild>
        <Link to={RouteConfigs.Note.Prefix + "/new/edit"}>
          <Plus />
          <p>Create note</p>
        </Link>
      </Button>

      <div className="w-[1px] bg-border h-4"></div>

      <Button
        className="cursor-pointer"
        variant="ghost"
        size="icon"
        onClick={() => {
          if (themeContext.theme === "dark") {
            themeContext.setTheme("light");
          } else {
            themeContext.setTheme("dark");
          }
        }}
      >
        {themeContext.theme === "light" ? <Moon /> : <Sun />}
      </Button>

      <div className="w-[1px] bg-border h-4"></div>

      {/* Profile button */}
      <Button className="cursor-pointer" variant="outline" asChild>
        <Link to={RouteConfigs.Management.Path + "/profile"}>
          <User />
          <p>My profile</p>
        </Link>
      </Button>
    </nav>
  );
}

function MobileNavigationBar() {
  return (
    <nav className="h-full flex items-center gap-2">
      {/* Notification button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="relative cursor-pointer"
            variant="ghost"
            size="icon"
          >
            <Bell />
            <Badge
              className="absolute w-2 h-2 p-0 top-2 right-3"
              variant="destructive"
            />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <EmptyNotification />
        </SheetContent>
      </Sheet>

      <div className="w-[1px] bg-border h-4"></div>

      {/* Menu button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="relative cursor-pointer"
            variant="ghost"
            size="icon"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigate to</SheetTitle>
            <SheetDescription>Go to any where in Tnditor</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-start">
            <Button className="relative cursor-pointer" variant="link" asChild>
              <Link to={RouteConfigs.Explore.Path}>
                <p>Explore</p>
              </Link>
            </Button>
            <Button className="relative cursor-pointer" variant="link" asChild>
              <Link to={RouteConfigs.Note.Prefix + "/new"}>
                <p>Create note</p>
              </Link>
            </Button>
            <Button className="relative cursor-pointer" variant="link" asChild>
              <Link to={RouteConfigs.Management.Path + "/profile"}>
                <p>My profile</p>
              </Link>
            </Button>
          </div>
          <SheetFooter>
            <p className="text-muted-foreground leading-7">@ Tnditor</p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default function GlobalHeader() {
  const { isDesktop } = useResponsive();

  return (
    <header className="sticky top-0 z-10 w-full h-[56px] bg-sidebar border-b-1 flex items-center justify-between px-3">
      <div className="h-full flex items-center gap-2">
        <Link
          className="scroll-m-20 text-xl font-semibold tracking-tight cursor-pointer"
          to={RouteConfigs.Home.Path}
        >
          Tnditor
        </Link>
        <div className="w-[1px] bg-border h-4"></div>
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="h-full flex items-center gap-2">
        {isDesktop ? <DesktopNavigationBar /> : <MobileNavigationBar />}
      </div>
    </header>
  );
}
