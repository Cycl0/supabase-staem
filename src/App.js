import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import {
  AppShell,
  Header,
  Button,
  Grid,
  Text,
  Title,
  useMantineTheme,
  LoadingOverlay,
} from "@mantine/core";
import { ReactComponent as InstallIcon } from "./assets/installIcon.svg";
import Carousel from "./components/Carousel/carousel";

const App = () => {
  const [data, setData] = useState([]);
  const [carouselGames, setCarouselGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase.from("steam").select("*");

      if (error && status !== 406) {
        throw error;
      }

      if (data.length) {
        setData(data);
        getRandomGames(data, 6);
        console.log(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRandomGames = (games, numGames) => {
    let uniqueIndexList = [];
    for (let i = 0, l = games.length; i < l; ++i) {
      uniqueIndexList.push(i);
    }

    let listRandomGames = [];
    for (let i = 0; i < numGames; ++i) {
      const randomIndex = Math.floor(Math.random() * uniqueIndexList.length);
      const uniqueRandomIndex = uniqueIndexList.splice(randomIndex, 1);
      listRandomGames.push(games[uniqueRandomIndex]);
    }
    setCarouselGames(listRandomGames);
  };

  return (
    <AppShell
      padding="md"
      header={
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
            <Title
              style={{ fontWeight: "700", fontSize: "40px", color: "white" }}
            >
              STAEM
            </Title>
            <Button
              radius="xl"
              size="md"
              sx={(theme) => ({
                backgroundColor: `${theme.colors.primary[5]} !important`,
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
        maxWidth: "80%",
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
      <Carousel games={carouselGames} />
    </AppShell>
  );
};

export default App;
