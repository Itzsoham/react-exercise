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
import { notifications } from "@mantine/notifications";
import { useMatch } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppStore } from "@/pages/landing/store/app.store";
import classes from "@/components/Navbar.module.css";

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();

  const isProductDetail = useMatch("/product/:id");
  const isBlogDetail = useMatch("/blog/:slug");

  function handleLogout() {
    logout();
    notifications.show({
      title: "Info",
      message: "You have been successfully logged out",
      color: "blue",
    });
    navigate("/login");
  }

  return (
    <Box px={{ base: 20, md: 100 }}>
      <header className={classes.header}>
        <Group align="center" justify="space-between" h="100%">
          <ThemeIcon
            size="xl"
            radius="xl"
            onClick={() => navigate("/")}
            className={classes.logo}
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
              to="/product/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2"
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              Product Detail
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              Blogs
            </NavLink>
            <NavLink
              to="/blog/the-ultimate-guide-to-productivity-hacks"
              className={({ isActive }) =>
                isActive ? `${classes.link} ${classes.active}` : classes.link
              }
            >
              Blog Detail
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
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <NavLink
            to="/products"
            className={classes.link}
            onClick={closeDrawer}
          >
            Product List
          </NavLink>
          <NavLink
            to="/product/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2"
            className={classes.link}
            onClick={closeDrawer}
          >
            Product Detail
          </NavLink>
          <NavLink to="/blogs" className={classes.link} onClick={closeDrawer}>
            Blogs
          </NavLink>
          <NavLink
            to="/blog/the-ultimate-guide-to-productivity-hacks"
            className={classes.link}
            onClick={closeDrawer}
          >
            Blog Detail
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
