import { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import ProtectedRoute from "./pages/landing/ProtectedRoute";
import { Loader } from "@mantine/core";

const Landing = lazy(() => import("./pages/landing/Landing"));
const Login = lazy(() => import("./pages/auth/Login"));
const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <Login /> },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <Landing /> },
          { path: "/products", element: <ProductList /> },
          { path: "/product/:id", element: <ProductDetails /> },
          { path: "/blogs", element: <BlogList /> },
          { path: "/blog/:title", element: <BlogDetails /> },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
