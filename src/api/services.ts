import { useQuery } from "@tanstack/react-query";

const URL = "https://api-dev-minimal-v510.vercel.app/api/product/list";

async function fetchProducts() {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useGetProducts() {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return {
    products: data?.products || [],
    productsLoading: isLoading,
    productsError: error,
    productsFetching: isFetching,
    productsEmpty: !isLoading && !data?.products?.length,
  };
}
