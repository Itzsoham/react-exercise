import { useState, useEffect, useMemo, useCallback } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useForm, yupResolver } from "@mantine/form";

export const PRODUCT_SIZE_OPTIONS = [
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "8.5", label: "8.5" },
  { value: "9", label: "9" },
  { value: "9.5", label: "9.5" },
  { value: "10", label: "10" },
  { value: "10.5", label: "10.5" },
  { value: "11", label: "11" },
  { value: "11.5", label: "11.5" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
];

export const PRODUCT_COLOR_NAME_OPTIONS = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "cyan", label: "Cyan" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "violet", label: "Violet" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
];

export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
  {
    group: "Clothing",
    classify: ["Shirts", "T-shirts", "Jeans", "Leather", "Accessories"],
  },
  {
    group: "Tailored",
    classify: ["Suits", "Blazers", "Trousers", "Waistcoats", "Apparel"],
  },
  {
    group: "Accessories",
    classify: ["Shoes", "Backpacks and bags", "Bracelets", "Face masks"],
  },
];

interface ProductFormValues {
  name: string;
  description: string;
  subDescription: string;
  images: FileWithPath[];
  code: string;
  sku: string;
  price: number;
  quantity: number;
  priceSale: number;
  tags: string[];
  taxes: number;
  gender: string;
  category: string;
  colors: string[];
  sizes: string[];
  newLabel: { enabled: boolean; content: string };
  saleLabel: { enabled: boolean; content: string };
}

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  images: Yup.array().min(1, "At least one image is required"),
  tags: Yup.array().min(2, "At least two tags are required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number().moreThan(0, "Price must be greater than 0"),
  description: Yup.string().required("Description is required"),
});

const ProductNewEditForm = ({
  currentProduct,
}: {
  currentProduct?: Partial<ProductFormValues>;
}) => {
  const navigate = useNavigate();
  const [includeTaxes, setIncludeTaxes] = useState(false);
  console.log(currentProduct);

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      subDescription: currentProduct?.subDescription || "",
      images: currentProduct?.images || [],
      code: currentProduct?.code || "",
      sku: currentProduct?.sku || "",
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || "",
      category: currentProduct?.category || "",
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || { enabled: false, content: "" },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: "" },
    }),
    [currentProduct] // Directly use currentProduct as the dependency
  );

  const form = useForm<ProductFormValues>({
    initialValues: defaultValues,
    validate: yupResolver(schema),
  });

  const handleDrop = useCallback(
    (files: FileWithPath[]) => {
      form.setFieldValue("images", files);
    },
    [form]
  );

  const categoryOptions = useMemo(
    () =>
      PRODUCT_CATEGORY_GROUP_OPTIONS.map((group) => ({
        group: group.group,
        items: group.classify.map((item) => ({
          value: item,
          label: item,
        })),
      })),
    []
  );

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      form.reset();
      showNotification({
        title: "Success",
        message: currentProduct ? "Update successful!" : "Product created!",
      });
      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="lg">
        <Card shadow="sm" p="lg">
          <Title order={4}>Product Details</Title>
          <TextInput
            label="Product Name"
            {...form.getInputProps("name")}
            required
          />
          <Textarea
            label="Description"
            {...form.getInputProps("description")}
            required
          />
          <Dropzone onDrop={handleDrop}>
            <Text ta="center">Drag images here or click to upload</Text>
          </Dropzone>
        </Card>

        <Card shadow="sm" p="lg">
          <Title order={4}>Pricing</Title>
          <NumberInput
            label="Price"
            {...form.getInputProps("price")}
            required
            min={0}
          />
          <NumberInput
            label="Sale Price"
            {...form.getInputProps("priceSale")}
            min={0}
          />
          <Switch
            label="Include Taxes"
            checked={includeTaxes}
            onChange={(event) => {
              setIncludeTaxes(event.currentTarget.checked);
              form.setFieldValue(
                "taxes",
                event.currentTarget.checked ? 0 : currentProduct?.taxes || 0
              );
            }}
          />
          {!includeTaxes && (
            <NumberInput
              label="Tax (%)"
              {...form.getInputProps("taxes")}
              min={0}
            />
          )}
        </Card>

        <Card shadow="sm" p="lg">
          <Title order={4}>Properties</Title>
          <Select
            label="Category"
            {...form.getInputProps("category")}
            data={categoryOptions}
            required
          />
          <MultiSelect
            label="Colors"
            {...form.getInputProps("colors")}
            data={PRODUCT_COLOR_NAME_OPTIONS}
          />
          <MultiSelect
            label="Sizes"
            {...form.getInputProps("sizes")}
            data={PRODUCT_SIZE_OPTIONS}
          />
          <Checkbox
            label="New Label"
            {...form.getInputProps("newLabel.enabled", { type: "checkbox" })}
          />
          <TextInput
            label="New Label Content"
            {...form.getInputProps("newLabel.content")}
            disabled={!form.values.newLabel.enabled}
          />
        </Card>

        <Group align="right" mt="md">
          <Button type="submit" loading={false}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ProductNewEditForm;
