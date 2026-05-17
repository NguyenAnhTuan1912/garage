// Import components
import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import SectionHeader from "@/shared/components/section-header";
import ThemeButtonGroup from "@/shared/components/theme-button-group";

export default function ThemeSettingSection() {
  return (
    <>
      <section>
        <Card className="rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <SectionHeader
                title="Theme"
                description="Adjust the color theme"
                size="small"
              />
            </div>
          </CardHeader>
          <CardContent>
            <ThemeButtonGroup />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
