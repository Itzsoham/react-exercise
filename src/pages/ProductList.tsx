import { useState, useEffect, useCallback } from "react";
import {
  Card,
  Container,
  Table,
  Loader,
  Group,
  ActionIcon,
  Tooltip,
  Title,
  ScrollArea,
} from "@mantine/core";
import {
  IconArrowUp,
  IconArrowDown,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import ProductTableToolbar from "@/components/Product/ProductTableToolbar";
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellCreatedAt,
  RowData,
} from "@/components/Product/ProductTableCell";
import { useNavigate } from "react-router-dom";
import { useGetProducts } from "@/api/services";
import { PRODUCT_STOCK_OPTIONS, PUBLISH_OPTIONS } from "@/utils/constants";

const defaultFilters = { publish: [], stock: [] };

export default function ProductListView() {
  const { products, productsLoading } = useGetProducts();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState<RowData[]>(products || []);
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (!products || products.length === 0) return;

    let filteredData = products;

    if (filters.stock.length > 0) {
      filteredData = filteredData.filter((p: RowData) =>
        filters.stock.includes(p.inventoryType as never)
      );
    }

    if (filters.publish.length > 0) {
      filteredData = filteredData.filter((p: RowData) =>
        filters.publish.includes(p.publish as never)
      );
    }

    setTableData(filteredData);
  }, [products, filters]);

  const handleSort = (column: keyof RowData) => {
    setSortBy(column);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));

    const sortedData = [...tableData].sort((a, b) => {
      if (a[column] < b[column]) return sortDirection === "asc" ? -1 : 1;
      if (a[column] > b[column]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setTableData(sortedData);
  };

  const handleFilters = useCallback((name: string, value: any) => {
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleDeleteRow = useCallback((id: string) => {
    setTableData((prevData) => prevData.filter((row) => row.id !== id));
  }, []);

  const handleEditRow = useCallback(
    (id: string) => {
      navigate(`/product/${id}`);
    },
    [navigate]
  );

  return (
    <Container>
      <Title order={2} my={20}>
        Products List
      </Title>
      <Card withBorder shadow="sm">
        <ProductTableToolbar
          filters={filters}
          onFilters={handleFilters}
          stockOptions={PRODUCT_STOCK_OPTIONS}
          publishOptions={PUBLISH_OPTIONS}
        />

        {productsLoading ? (
          <Loader size="lg" />
        ) : (
          <ScrollArea style={{ width: "100%" }}>
            <Table striped highlightOnHover style={{ minWidth: "800px" }}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th
                    onClick={() => handleSort("name")}
                    style={{ cursor: "pointer" }}
                  >
                    Product{" "}
                    {sortBy === "name" &&
                      (sortDirection === "asc" ? (
                        <IconArrowUp size={16} />
                      ) : (
                        <IconArrowDown size={16} />
                      ))}
                  </Table.Th>
                  <Table.Th
                    onClick={() => handleSort("createdAt")}
                    style={{ cursor: "pointer" }}
                  >
                    Created At{" "}
                    {sortBy === "createdAt" &&
                      (sortDirection === "asc" ? (
                        <IconArrowUp size={16} />
                      ) : (
                        <IconArrowDown size={16} />
                      ))}
                  </Table.Th>
                  <Table.Th
                    onClick={() => handleSort("inventoryType")}
                    style={{ cursor: "pointer" }}
                  >
                    Stock{" "}
                    {sortBy === "inventoryType" &&
                      (sortDirection === "asc" ? (
                        <IconArrowUp size={16} />
                      ) : (
                        <IconArrowDown size={16} />
                      ))}
                  </Table.Th>
                  <Table.Th
                    onClick={() => handleSort("price")}
                    style={{ cursor: "pointer" }}
                  >
                    Price{" "}
                    {sortBy === "price" &&
                      (sortDirection === "asc" ? (
                        <IconArrowUp size={16} />
                      ) : (
                        <IconArrowDown size={16} />
                      ))}
                  </Table.Th>
                  <Table.Th
                    onClick={() => handleSort("publish")}
                    style={{ cursor: "pointer" }}
                  >
                    Publish{" "}
                    {sortBy === "publish" &&
                      (sortDirection === "asc" ? (
                        <IconArrowUp size={16} />
                      ) : (
                        <IconArrowDown size={16} />
                      ))}
                  </Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {tableData.length ? (
                  tableData.map((row) => (
                    <Table.Tr key={row.id}>
                      <Table.Td>
                        <RenderCellProduct params={{ row }} />
                      </Table.Td>
                      <Table.Td>
                        <RenderCellCreatedAt params={{ row }} />
                      </Table.Td>
                      <Table.Td>
                        <RenderCellStock params={{ row }} />
                      </Table.Td>
                      <Table.Td>
                        <RenderCellPrice params={{ row }} />
                      </Table.Td>
                      <Table.Td>
                        <RenderCellPublish params={{ row }} />
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Tooltip label="Edit">
                            <ActionIcon
                              variant="subtle"
                              onClick={() => handleEditRow(row.id)}
                            >
                              <IconPencil size={18} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete">
                            <ActionIcon
                              color="red"
                              variant="subtle"
                              onClick={() => handleDeleteRow(row.id)}
                            >
                              <IconTrash size={18} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={6}>
                      <Title order={4}>No Products Found</Title>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        )}
      </Card>
    </Container>
  );
}
