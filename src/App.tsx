import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Loader, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./App.scss";
import "@mantine/core/styles.css";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider theme={theme}>
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
