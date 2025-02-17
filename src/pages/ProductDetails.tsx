import {
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  Group,
  Loader,
  NumberInput,
  Stack,
  Switch,
  Textarea,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProduct } from "@/api/services";
import ProductNewEditForm from "@/components/Product/ProductNewEditForm";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, productLoading } = useGetProduct(id || null);
  const currentProduct = product?.product;

  return (
    <Container size="lg">
      {/* <CustomBreadcrumbs
        heading={id ? "Edit Product" : "New Product"}
        links={[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Products", href: "/dashboard/products" },
          { name: currentProduct?.name || "New Product" },
        ]}
      /> */}

      <Card shadow="sm" p="lg">
        <Title order={3}>{id ? "Edit Product" : "Create Product"}</Title>
        <Divider my="sm" />
        {productLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Loader />
          </div>
        ) : (
          <ProductNewEditForm currentProduct={currentProduct} />
        )}
      </Card>
    </Container>
  );
}
