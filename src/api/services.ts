import { useQuery } from "@tanstack/react-query";

const URL = "https://api-dev-minimal-v510.vercel.app/api/";

// api services //

async function fetchProducts() {
  const response = await fetch(URL + "product/list");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function fetchProductDetails(productId: string) {
  const response = await fetch(URL + `product/details?productId=${productId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function fetchBlogs() {
  const response = await fetch(URL + "post/list");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function fetchSearchBlogs(query: string) {
  const response = await fetch(URL + `post/search?query=${query}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function fetchBlogDetails(title: string) {
  const response = await fetch(URL + `post/details?title=${title}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// react query hooks //

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

export function useGetProduct(productId: string | null) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetails(productId!),
    enabled: !!productId,
  });

  return {
    product: data,
    productLoading: isLoading,
    productError: error,
    productFetching: isFetching,
  };
}

export function useGetBlogs() {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return {
    blogs: data?.posts || [],
    blogsLoading: isLoading,
    blogsError: error,
    blogsFetching: isFetching,
    blogsEmpty: !isLoading && !data?.posts?.length,
  };
}

export function useSearchBlogs(query: string) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSearchBlogs(query),
  });

  return {
    searchResults: data?.posts || [],
    searchLoading: isLoading,
    searchError: error,
    searchFetching: isFetching,
    searchEmpty: !isLoading && !data?.posts?.length,
  };
}

export function useGetBlog(title: string) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["blog", title],
    queryFn: () => fetchBlogDetails(title),
  });

  return {
    blog: data,
    blogLoading: isLoading,
    blogError: error,
    blogFetching: isFetching,
  };
}
