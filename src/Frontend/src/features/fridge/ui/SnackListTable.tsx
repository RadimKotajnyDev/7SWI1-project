import { Box, Icon, IconButton, NativeSelect, Table } from "@chakra-ui/react";
import { useState } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuChevronsUpDown,
  LuTrash2,
} from "react-icons/lu";
import { SnackStatus, type SnackItem } from "../model/types";

type SortKey = "name" | "fridgeLocation" | "status";
type SortDir = "asc" | "desc";

interface SnackListTableProps {
  snacks: SnackItem[];
  onUpdateStatus: (id: string, status: SnackStatus) => void;
  onDelete: (id: string) => void;
  pendingId: string | null;
}

const SortIcon = ({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey | null; sortDir: SortDir }) => {
  if (col !== sortKey) return <Icon as={LuChevronsUpDown} boxSize={3.5} opacity={0.4} />;
  return sortDir === "asc"
    ? <Icon as={LuChevronUp} boxSize={3.5} />
    : <Icon as={LuChevronDown} boxSize={3.5} />;
};

const sortSnacks = (snacks: SnackItem[], key: SortKey | null, dir: SortDir): SnackItem[] => {
  if (!key) return snacks;
  return [...snacks].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    const cmp = typeof av === "number" && typeof bv === "number"
      ? av - bv
      : String(av).localeCompare(String(bv));
    return dir === "asc" ? cmp : -cmp;
  });
};

export const SnackListTable = ({
  snacks,
  onUpdateStatus,
  onDelete,
  pendingId,
}: SnackListTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = sortSnacks(snacks, sortKey, sortDir);

  const headerCell = (label: string, key: SortKey) => (
    <Table.ColumnHeader
      onClick={() => handleSort(key)}
      cursor="pointer"
      userSelect="none"
      _hover={{ bg: "bg.muted" }}
    >
      <Box display="inline-flex" alignItems="center" gap={1}>
        {label}
        <SortIcon col={key} sortKey={sortKey} sortDir={sortDir} />
      </Box>
    </Table.ColumnHeader>
  );

  return (
    <Table.Root size="md" variant="line" interactive>
      <Table.Header>
        <Table.Row>
          {headerCell("Name", "name")}
          {headerCell("Location", "fridgeLocation")}
          {headerCell("Status", "status")}
          <Table.ColumnHeader w="1px" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sorted.map((snack) => (
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
