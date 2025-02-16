import { useCallback } from "react";
import { Box, Button, Chip, Group, Paper, Stack } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

interface ProductTableFiltersResultProps {
  filters: {
    stock: string[];
    publish: string[];
  };
  onFilters: (key: string, value: string[]) => void;
  results: number;
  onResetFilters: () => void;
}

export default function ProductTableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results,
  ...other
}: ProductTableFiltersResultProps) {
  const handleRemoveStock = useCallback(
    (inputValue: string) => {
      const newValue = filters.stock.filter((item) => item !== inputValue);
      onFilters("stock", newValue);
    },
    [filters.stock, onFilters]
  );

  const handleRemovePublish = useCallback(
    (inputValue: string) => {
      const newValue = filters.publish.filter((item) => item !== inputValue);
      onFilters("publish", newValue);
    },
    [filters.publish, onFilters]
  );

  return (
    <Stack gap="sm" {...other}>
      <Box>
        <strong>{results}</strong>
        <span style={{ color: "#6b7280", marginLeft: 4 }}>results found</span>
      </Box>

      <Group gap="sm" wrap="wrap" align="center">
        {!!filters.stock.length && (
          <Block label="Stock:">
            {filters.stock.map((item) => (
              <Chip
                key={item}
                variant="filled"
                size="sm"
                onClick={() => handleRemoveStock(item)}
              >
                {item}
              </Chip>
            ))}
          </Block>
        )}

        {!!filters.publish.length && (
          <Block label="Publish:">
            {filters.publish.map((item) => (
              <Chip
                key={item}
                variant="filled"
                size="sm"
                onClick={() => handleRemovePublish(item)}
              >
                {item}
              </Chip>
            ))}
          </Block>
        )}

        <Button color="red" onClick={onResetFilters}>
          <IconTrash size={16} />
          Clear
        </Button>
      </Group>
    </Stack>
  );
}

interface BlockProps {
  label: string;
  children: React.ReactNode;
}

function Block({ label, children }: BlockProps) {
  return (
    <Paper
      withBorder
      p="xs"
      radius="sm"
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        borderStyle: "dashed",
      }}
    >
      <span style={{ fontWeight: 600 }}>{label}</span>
      <Group gap="xs" align="center" wrap="wrap">
        {children}
      </Group>
    </Paper>
  );
}
