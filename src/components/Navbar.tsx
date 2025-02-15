import { IconFingerprint } from "@tabler/icons-react";
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
import { Link, useNavigate } from "react-router-dom";

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
        <Group position="apart" h="100%">
          <ThemeIcon
            color="blue"
            size="xl"
            radius="xl"
            onClick={() => navigate("/")}
            className="cursor-pointer"
          >
            <IconFingerprint />
          </ThemeIcon>
          <Group h="100%" spacing={20} display={{ base: "none", sm: "flex" }}>
            <Link to="/users" className={classes.link}>
              UserList
            </Link>

            <Link to="/" className={classes.link}>
              User Detail
            </Link>
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
        styles={(theme) => ({
          content: {
            [theme.fn.largerThan("sm")]: {
              display: "none",
            },
          },
        })}
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <Link to="/users" className={classes.link}>
            UserList
          </Link>

          <Divider my="sm" />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
