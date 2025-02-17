import { FC } from "react";
import { Box, Text, Title } from "@mantine/core";

const Landing: FC = () => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
        h={"90vh"}
      >
        <Title order={4}> Hello Scipt Assist </Title>
        <Text style={{ textAlign: "center" }}>
          Thanks for this opportunity. I am excited to work with you.
        </Text>
      </Box>
    </>
  );
};

export default Landing;
