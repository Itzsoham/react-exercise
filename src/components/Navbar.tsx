import { IconCrown } from "@tabler/icons-react";
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/components/Navbar.module.css";
import { useAppStore } from "@/pages/landing/store/app.store";
import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Box px={100}>
      <header className={classes.header}>
        <Group align="center" justify="space-between" h="100%">
          <ThemeIcon
            size="xl"
            radius="xl"
            onClick={() => navigate("/")}
            className="logo"
          >
            <IconCrown />
          </ThemeIcon>
          <Group h="100%" gap={20} display={{ base: "none", sm: "flex" }}>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              Product List
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              Product Detail
            </NavLink>
          </Group>

          <Group display={{ base: "none", sm: "flex" }}>
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            display={{ base: "block", sm: "none" }}
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        styles={{
          content: {
            display: "none",
          },
        }}
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <NavLink to="/products" className={classes.link}>
            Product List
          </NavLink>
          <NavLink to="/products/create" className={classes.link}>
            Create Product
          </NavLink>

          <Divider my="sm" />

          <Group align="center" grow pb="xl" px="md">
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
