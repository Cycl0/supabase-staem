import { Header, Grid } from "@mantine/core";

function CustomHeader(props) {
  const { children } = props;
  return (
    <Header
      height={160}
      pt="xs"
      sx={{
        background: "transparent",
        border: "none",
      }}
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
