import React, { useState } from "react";
import { Header, Grid, useMantineTheme } from "@mantine/core";

function CustomHeader(props) {
  const { children } = props;
  const theme = useMantineTheme();
  return (
    <Header
      height={160}
      pt="xs"
      px="xl"
      sx={(theme) => ({
        background: "transparent",
        border: "none",
      })}
    >
      <Grid
        justify="space-between"
        align="center"
        p="xl"
        style={{ height: "100%" }}
      >
        {children}
      </Grid>
    </Header>
  );
}

export default CustomHeader;
