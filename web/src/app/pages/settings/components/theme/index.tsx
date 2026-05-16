// Import components
import { Button } from "@/shared/components/ui/button";
import { ButtonGroup } from "@/shared/components/ui/button-group";
import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import SectionHeader from "@/shared/components/section-header";

// Import hooks
import { useTheme } from "@/shared/components/theme-provider";

export default function ThemeSettingSection() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <section>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <SectionHeader
                title="Theme"
                description="Adjust the color theme"
              />
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </section>
    </>
  );
}
