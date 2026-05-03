import { IconButton, NativeSelect, Table } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { SnackStatus, type SnackItem } from "../model/types";

interface SnackListTableProps {
  snacks: SnackItem[];
  onUpdateStatus: (id: string, status: SnackStatus) => void;
  onDelete: (id: string) => void;
  pendingId: string | null;
}

export const SnackListTable = ({
  snacks,
  onUpdateStatus,
  onDelete,
  pendingId,
}: SnackListTableProps) => {
  return (
    <Table.Root size="md" variant="line" interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Location</Table.ColumnHeader>
          <Table.ColumnHeader>Status</Table.ColumnHeader>
          <Table.ColumnHeader w="1px" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {snacks.map((snack) => (
          <Table.Row key={snack.id}>
            <Table.Cell fontWeight="medium">{snack.name}</Table.Cell>
            <Table.Cell color="fg.muted">{snack.fridgeLocation}</Table.Cell>
            <Table.Cell>
              <NativeSelect.Root
                size="sm"
                disabled={pendingId === snack.id}
                w="auto"
                border="2px solid"
                borderColor="border"
                borderRadius="none"
              >
                <NativeSelect.Field
                  value={snack.status}
                  onChange={(e) =>
                    onUpdateStatus(
                      snack.id,
                      Number(e.target.value) as SnackStatus,
                    )
                  }
                >
                  <option value={SnackStatus.InStock}>In Stock</option>
                  <option value={SnackStatus.RunningLow}>Running Low</option>
                  <option value={SnackStatus.OutOfStock}>Out of Stock</option>
                  <option value={SnackStatus.Ordered}>Ordered</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Table.Cell>
            <Table.Cell>
              <IconButton
                aria-label="Delete snack"
                variant="ghost"
                size="sm"
                colorPalette="red"
                disabled={pendingId === snack.id}
                onClick={() => onDelete(snack.id)}
              >
                <LuTrash2 />
              </IconButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
