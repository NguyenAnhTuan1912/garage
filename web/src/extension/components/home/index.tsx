import { Link } from "react-router";
import { Link2 } from "lucide-react";

// Import configs
import { ExtensionRouteConfigs } from "@/shared/config/routes";

// Import components
import { Button } from "@/shared/components/ui/button";

export default function Home() {
  return (
    <div>
      <p>Hello, this is your home. You can navigate to these "page".</p>
      <div className="flex flex-col">
        <Link to={ExtensionRouteConfigs.Collection.Path}>
          <Button variant="link">
            <Link2 />
            Go to Collections
          </Button>
        </Link>

        <Link to={ExtensionRouteConfigs.Item.Path}>
          <Button variant="link">
            <Link2 />
            Go to Collections' Items
          </Button>
        </Link>

        <Link to={ExtensionRouteConfigs.Note.Path}>
          <Button variant="link">
            <Link2 />
            Go to Note
          </Button>
        </Link>

        <Link to={ExtensionRouteConfigs.WorkBench.Path}>
          <Button variant="link">
            <Link2 />
            Go to Workbench
          </Button>
        </Link>
      </div>
    </div>
  );
}
