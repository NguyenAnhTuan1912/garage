import { Link } from "react-router";
import { Link2 } from "lucide-react";

// Import configs
import { ExtensionRouteConfigs } from "@/shared/config/routes";

// Import components
import { Button } from "@/shared/components/ui/button";

// Import states
import { workbenchStateActions } from "@/extension/state/workbench";
import { EWorkbenchSectionName } from "@/extension/state/workbench/type";

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

        <Link to={ExtensionRouteConfigs.Note.Path}>
          <Button variant="link">
            <Link2 />
            Go to Note
          </Button>
        </Link>

        <div>
          <Link to={ExtensionRouteConfigs.WorkBench.Path}>
            <Button variant="link">
              <Link2 />
              Go to Workbench
            </Button>
          </Link>
          <div className="px-5">
            <div className="flex">
              <div className="h-[36px] w-0.5 bg-foreground/20"></div>
              <Link to={ExtensionRouteConfigs.WorkBench.Path}>
                <Button
                  variant="link"
                  onClick={() => {
                    workbenchStateActions.setCurrnetSectionName(
                      EWorkbenchSectionName.SiteCollector
                    );
                  }}
                >
                  <Link2 />
                  Create new site item
                </Button>
              </Link>
            </div>
            <div className="flex">
              <div className="h-[36px] w-0.5 rounded-b-lg bg-foreground/20"></div>
              <Link to={ExtensionRouteConfigs.WorkBench.Path}>
                <Button
                  variant="link"
                  onClick={() => {
                    workbenchStateActions.setCurrnetSectionName(
                      EWorkbenchSectionName.WordCollector
                    );
                  }}
                >
                  <Link2 />
                  Create new word item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
