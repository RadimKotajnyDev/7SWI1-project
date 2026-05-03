import { Badge, Table } from "@chakra-ui/react";
import { SnackStatus, type SnackItem } from "../model/types";

interface SnackListTableProps {
  snacks: SnackItem[];
  onUpdateStatus?: (id: string, status: SnackStatus) => void;
  onDelete?: (id: string) => void;
}

const statusConfig: Record<SnackStatus, { label: string; color: string }> = {
  [SnackStatus.InStock]: { label: "In Stock", color: "green" },
  [SnackStatus.RunningLow]: { label: "Running Low", color: "orange" },
  [SnackStatus.OutOfStock]: { label: "Out of Stock", color: "red" },
  [SnackStatus.Ordered]: { label: "Ordered", color: "blue" },
};

export const SnackListTable = ({ snacks }: SnackListTableProps) => {
  console.log("Snacks received in table:", snacks);
  return (
    <Table.Root size="md" variant="line" interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Location</Table.ColumnHeader>
          <Table.ColumnHeader>Status</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {snacks.map((snack) => (
          <Table.Row key={snack.id}>
            <Table.Cell fontWeight="medium">{snack.name}</Table.Cell>
            <Table.Cell color="fg.muted">{snack.fridgeLocation}</Table.Cell>
            <Table.Cell>
              <Badge colorPalette={statusConfig[snack.status]?.color || "gray"}>
                {statusConfig[snack.status]?.label || "Unknown"}
              </Badge>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
