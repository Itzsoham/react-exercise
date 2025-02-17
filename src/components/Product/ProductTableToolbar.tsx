import { useState } from "react";
import { MultiSelect, Button } from "@mantine/core";

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
        flexWrap: "wrap",
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
        style={{ flex: "1 1 300px", minWidth: "200px" }} // Responsive width
      />

      <MultiSelect
        label="Publish"
        data={publishOptions}
        value={selectedPublish}
        onChange={setSelectedPublish}
        searchable
        clearable
        style={{ flex: "1 1 300px", minWidth: "200px" }} // Responsive width
      />

      <div style={{ flex: "1 1 100px", textAlign: "right" }}>
        <Button
          onClick={handleApplyFilters}
          style={{
            width: "100%", // Full width on small screens
            minWidth: "120px", // Keep a reasonable min size
          }}
        >
          Display
        </Button>
      </div>
    </div>
  );
}
