// Import components
import ApiKeyColumnActions from "./api-key-column-actions";
import ApiKeyStatusBadge from "./api-key-status-badge";

// Import helpers / utils
import * as DateTimeUtils from "@/shared/utils/datetime";

// Import types
import type { ColumnDef } from "@tanstack/react-table";
import type { TApiKey } from "@/shared/modules/auth/type";

export const columns: ColumnDef<TApiKey>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell({ row }) {
      const isActive = row.getValue("isActive") as boolean;
      return <ApiKeyStatusBadge isActive={isActive} />
    },
  },
  {
    accessorKey: "expireAt",
    header: "Expire Date",
    cell({ row }) {
      const expireAt = row.getValue("expireAt") as string;
      const dateTimeStr = DateTimeUtils.getDateTimeStr(expireAt);
      const timeStr  = DateTimeUtils.getTimeStr(expireAt);
      const dateDiffCount = DateTimeUtils.getDateDistance(new Date(expireAt));

      return `${dateTimeStr}, at ${timeStr} (${dateDiffCount} days left)`;
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ApiKeyColumnActions
  }
  // {
  //   accessorKey: "createdAt",
  //   header: "Created Date",
  //   cell({ row }) {
  //     const expireAt = row.getValue("expireAt") as string;
  //     const dateTimeStr = DateTimeUtils.getDateTimeStr(expireAt);
  //     const timeStr  = DateTimeUtils.getTimeStr(expireAt);

  //     return `${dateTimeStr}, at ${timeStr}`;
  //   }
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated Date",
  //   cell({ row }) {
  //     const expireAt = row.getValue("expireAt") as string;
  //     const dateTimeStr = DateTimeUtils.getDateTimeStr(expireAt);
  //     const timeStr  = DateTimeUtils.getTimeStr(expireAt);

  //     return `${dateTimeStr}, at ${timeStr}`;
  //   }
  // },
];
