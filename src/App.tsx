import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Loader, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "./App.scss";
import { theme } from "./theme";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <Suspense
        fallback={
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
        }
      >
        <Outlet />
      </Suspense>
    </MantineProvider>
  );
}
