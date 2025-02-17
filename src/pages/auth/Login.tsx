import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./Login.module.css";
import { useAppStore } from "../landing/store/app.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

export default function Login() {
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState("test@exemple.com");
  const [password, setPassword] = useState("123Qwe");

  const handleLogin = () => {
    if (email && password) {
      login();
      notifications.show({
        title: "Success",
        message: "You have successfully logged in.",
        color: "green",
      });
      navigate("/");
    } else {
      notifications.show({
        title: "Error",
        message: "Please fill Email and Password fields.",
        color: "red",
      });
    }
  };

  const handleRegister = (event: React.MouseEvent) => {
    event.preventDefault();
    notifications.show({
      title: "Info",
      message: "Register is not implemented yet.",
      color: "blue",
    });
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30} pt={150}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={30}>
          Welcome back!
        </Title>

        <TextInput
          label="Email address"
          placeholder="Your email"
          size="md"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={handleLogin}
          variant="filled"
          radius="xl"
          type="submit"
        >
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor<"a"> href="#" fw={700} onClick={handleRegister}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
