import { useNavigate, useLocation } from "react-router";
import { Menu, ChevronLeft } from "lucide-react";

// Import configs
import {
  ExtensionRouteConfigs,
  extRouteNameByPath,
} from "@/shared/config/routes";

// Import components
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Text from "@/shared/components/text";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack =
    location.key !== "default" &&
    location.pathname !== ExtensionRouteConfigs.Home.Path;

  return (
    <header className="flex w-full items-center justify-between border-b p-2">
      <div className="flex items-center gap-3">
        {canGoBack && (
          <Button
            variant="secondary"
            size="icon"
            className="rounded-lg"
            onClick={() => {
              navigate("..");
            }}
          >
            <ChevronLeft />
          </Button>
        )}
        <Text variant="sub-body">{extRouteNameByPath[location.pathname]}</Text>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-lg">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Cabinet</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigate(ExtensionRouteConfigs.Collection.Path);
              }}
            >
              Collections
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate(ExtensionRouteConfigs.Item.Path);
              }}
            >
              Collections' Items
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate(ExtensionRouteConfigs.Note.Path);
              }}
            >
              Notes
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate(ExtensionRouteConfigs.WorkBench.Path);
              }}
            >
              Workbench
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Access Control</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigate(ExtensionRouteConfigs.AccessControl.Path);
              }}
            >
              Api Key
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                navigate(ExtensionRouteConfigs.Setting.Path);
              }}
            >
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
