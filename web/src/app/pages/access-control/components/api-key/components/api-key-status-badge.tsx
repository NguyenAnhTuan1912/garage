// Import components
import { Badge } from "@/shared/components/ui/badge";

export default function ApiKeyStatusBadge({ isActive }: { isActive: boolean }) {
  if (isActive) {
    return (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
      >
        ACTIVE
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
    >
      IN-ACTIVE
    </Badge>
  );
}
