// Import components
import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import SectionHeader from "@/shared/components/section-header";
import { DataTable } from "@/shared/components/data-table";
import { columns } from "./components/columns";
import ApiKeyViewDialog from "./components/api-key-view-dialog";
import ApiKeyCreateDialog from "./components/api-key-create-dialog";

// Import modules
import { useApiKeysQuery } from "@/shared/modules/auth/query";

export default function ApiKeySection() {
  const { data } = useApiKeysQuery();
  const apiKeys = data?.data.data;

  return (
    <>
      <ApiKeyViewDialog />
      <section>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <SectionHeader
                title="Api Keys"
                description="Your api keys are shown in here."
              />
              <ApiKeyCreateDialog />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={apiKeys || []} />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
