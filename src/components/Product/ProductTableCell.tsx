import { fDate, fTime } from "@/utils";
import {
  Avatar,
  Badge,
  Box,
  Group,
  Progress,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { Link } from "react-router-dom";

export interface RowData {
  id: string;
  price: number;
  publish: string;
  createdAt: string;
  available: number;
  quantity: number;
  stockStatus: string;
  publishStatus: string;
  inventoryType: string;
  name: string;
  coverUrl: string;
  category: string;
  onViewRow: () => void;
}

interface CellProps {
  params: { row: RowData };
}

export function RenderCellPrice({ params }: CellProps) {
  return <Text>{params.row.price}</Text>;
}

export function RenderCellPublish({ params }: CellProps) {
  return (
    <Badge
      // variant="light"
      color={params.row.publish === "draft" ? "" : "purple"}
    >
      {params.row.publish}
    </Badge>
  );
}

export function RenderCellCreatedAt({ params }: CellProps) {
  return (
    <Stack gap={2}>
      <Text size="sm">{fDate(params.row.createdAt)}</Text>
      <Text size="xs" color="dimmed">
        {fTime(params.row.createdAt)}
      </Text>
    </Stack>
  );
}

export function RenderCellStock({ params }: CellProps) {
  const progressColor =
    params.row.inventoryType === "out of stock"
      ? "red"
      : params.row.inventoryType === "low stock"
      ? "yellow"
      : "green";

  return (
    <Stack gap={4}>
      <Progress
        value={(params.row.available * 100) / params.row.quantity}
        color={progressColor}
        size="sm"
      />
      <Text size="xs" color="dimmed">
        {params.row.available > 0 ? params.row.available : "0"}{" "}
        {params.row.inventoryType}
      </Text>
    </Stack>
  );
}

export function RenderCellProduct({ params }: CellProps) {
  return (
    <Group wrap="nowrap">
      <Avatar
        src={params.row.coverUrl}
        alt={params.row.name}
        size={48}
        radius="md"
      />
      <Stack gap={0}>
        <Text
          size="sm"
          fw={500}
          component={Link}
          to="#"
          onClick={params.row.onViewRow}
          style={{ cursor: "pointer" }}
        >
          {params.row.name}
        </Text>
        <Text size="xs" color="dimmed">
          {params.row.category}
        </Text>
      </Stack>
    </Group>
  );
}
