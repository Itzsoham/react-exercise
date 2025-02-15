import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import Landing from "./pages/landing/Landing";
import ProtectedRoute from "./pages/landing/ProtectedRoute";
import Login from "./pages/auth/Login";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails";

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
          { path: "/users", element: <UserList /> },
          { path: "/users/:id", element: <UserDetails /> },
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
