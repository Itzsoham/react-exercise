import { useState } from "react";
import { MultiSelect, Button, Menu, Popover } from "@mantine/core";

interface FilterOption {
  value: string;
  label: string;
}

interface ProductTableToolbarProps {
  filters: { stock: string[]; publish: string[] };
  onFilters: (key: "stock" | "publish", value: string[]) => void;
  stockOptions: FilterOption[];
  publishOptions: FilterOption[];
}

export default function ProductTableToolbar({
  filters,
  onFilters,
  stockOptions,
  publishOptions,
}: ProductTableToolbarProps) {
  const [selectedStock, setSelectedStock] = useState<string[]>(filters.stock);
  const [selectedPublish, setSelectedPublish] = useState<string[]>(
    filters.publish
  );

  const handleApplyFilters = () => {
    onFilters("stock", selectedStock);
    onFilters("publish", selectedPublish);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "1rem",
        paddingTop: "0",
      }}
    >
      <MultiSelect
        label="Stock"
        data={stockOptions}
        value={selectedStock}
        onChange={setSelectedStock}
        searchable
        clearable
      />

      <MultiSelect
        label="Publish"
        data={publishOptions}
        value={selectedPublish}
        onChange={setSelectedPublish}
        searchable
        clearable
      />

      <div style={{ marginLeft: "auto" }}>
        <Button onClick={handleApplyFilters}>Display</Button>
      </div>
    </div>
  );
}
