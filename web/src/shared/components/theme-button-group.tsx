// Import components
import { Button } from "@/shared/components/ui/button";
import { ButtonGroup } from "@/shared/components/ui/button-group";

// Import hooks
import { useTheme } from "@/shared/components/theme-provider";

export default function ThemeButtonGroup() {
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup>
      <Button
        variant={theme === "light" ? "default" : "secondary"}
        onClick={() => setTheme("light")}
      >
        Light
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "secondary"}
        onClick={() => setTheme("dark")}
      >
        Dark
      </Button>
      <Button
        variant={theme === "system" ? "default" : "secondary"}
        onClick={() => setTheme("system")}
      >
        System
      </Button>
    </ButtonGroup>
  );
}
