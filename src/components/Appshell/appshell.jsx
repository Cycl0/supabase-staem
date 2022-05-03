import React, { useState } from "react";
import { AppShell, useMantineTheme, LoadingOverlay } from "@mantine/core";

function CustomAppshell(props) {
  const { children, header, loading } = props;
  const theme = useMantineTheme();
  return (
    <AppShell
      padding="md"
      header={header}
      sx={(theme) => ({
        maxWidth: "95%",
        margin: "0 auto",
        minHeight: "100vh",
        paddingBottom: "140px",
      })}
    >
      <LoadingOverlay
        loaderProps={{
          size: "xl",
          color: theme.colors.primary[12],
          variant: "bars",
        }}
        overlayOpacity={0.1}
        overlayColor={theme.colors.primary[12]}
        visible={loading}
      />
      {children}
    </AppShell>
  );
}

export default CustomAppshell;
