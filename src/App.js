import {
  AppShell,
  Header,
  Button,
  Grid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ReactComponent as InstallIcon } from "./assets/installIcon.svg";

function App() {
  const theme = useMantineTheme();
  return (
    <AppShell
      padding="md"
      header={
        <Header
          height={100}
          pt="xs"
          px="xl"
          sx={(theme) => ({
            backgroundColor: theme.colors.primary[6],
            border: "none",
          })}
        >
          <Grid justify="space-between" p="xl" style={{ height: "100%" }}>
            <Title
              style={{ fontWeight: "700", fontSize: "40px", color: "white" }}
            >
              STAEM
            </Title>
            <Button
              radius="xl"
              size="md"
              sx={(theme) => ({
                backgroundColor: theme.colors.primary[5],
                padding: "0 40px",
              })}
            >
              <InstallIcon />
              <Text ml="sm">Install</Text>
            </Button>
          </Grid>
        </Header>
      }
      sx={(theme) => ({
        width: "100%",
        minHeight: "100vh",
        paddingBottom: "140px",
        backgroundColor: theme.colors.primary[6],
      })}
    ></AppShell>
  );
}

export default App;
