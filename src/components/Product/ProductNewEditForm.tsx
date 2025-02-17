import { useState, useMemo, useCallback } from "react";
import {
  Button,
  Card,
  Checkbox,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";

import {
  PRODUCT_CATEGORY_GROUP_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_SIZE_OPTIONS,
} from "@/utils/constants";
import ProductRichTextEditor from "./ProductRichTextEditor";

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
    [currentProduct]
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
        message: "Update successful!",
        color: "green",
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
          <TextInput
            label="Product Name"
            {...form.getInputProps("name")}
            required
            mb={10}
          />
          <ProductRichTextEditor
            content={form.getInputProps("description").value}
          />
          <Dropzone onDrop={handleDrop} mt={10}>
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
            mt={10}
            label="New Label"
            {...form.getInputProps("newLabel.enabled", { type: "checkbox" })}
          />
          <TextInput
            label="New Label Content"
            {...form.getInputProps("newLabel.content")}
            disabled={!form.values.newLabel.enabled}
          />
        </Card>
        <Group p={"lg"} ml={"auto"} style={{ maxWidth: "400px" }}>
          <Button type="submit" loading={false}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ProductNewEditForm;
