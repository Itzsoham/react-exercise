import { Card, Container, Divider, Loader, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

import { useGetProduct } from "@/api/services";
import ProductNewEditForm from "@/components/Product/ProductNewEditForm";

export default function ProductDetails() {
  const { id } = useParams();
  const { product, productLoading } = useGetProduct(id || null);
  const currentProduct = product?.product;

  return (
    <Container size="lg">
      <Card shadow="sm" p="lg">
        <Title order={3}>Edit Product</Title>
        <Divider my="md" />
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
