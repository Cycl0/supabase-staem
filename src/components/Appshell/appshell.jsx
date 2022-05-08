import { AppShell, LoadingOverlay } from "@mantine/core";

function CustomAppshell(props) {
  const { children, header, loading } = props;
  return (
    <AppShell
      padding="md"
      header={header}
      sx={{
        maxWidth: "95%",
        margin: "0 auto",
        minHeight: "100vh",
        paddingBottom: "140px",
      }}
    >
      <LoadingOverlay
        loaderProps={{
          size: "xl",
          color: "white",
          variant: "bars",
        }}
        sx={{
          position: "fixed",
        }}
        overlayOpacity={0.6}
        overlayColor="white"
        visible={loading}
      />
      {children}
    </AppShell>
  );
}

export default CustomAppshell;
