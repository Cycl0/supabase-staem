import React, { useState, useEffect, useRef } from "react";
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
  const installButton = useRef();
  const [buttonClicked, setButtonClicked] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase.from("steam").select("*");

      if (error && status !== 406) {
        throw error;
      }

      if (data.length) {
        const games = sortById(data);
        setData(games);
        const randomGames = getRandomGames(data, 6);
        setCarouselGames(randomGames);
        console.log(games);
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
    return listRandomGames;
  };

  const sortById = (games) => {
    return games.sort((a, b) => {
      return a.id - b.id;
    });
  };

  const installButtonClick = (event) => {
    //ripple effect on button
    const installButton = event.currentTarget;
    const ripple = document.createElement("span");
    installButton.appendChild(ripple);
    const { left, top } = installButton.getBoundingClientRect();
    ripple.style.top = event.clientY - top - ripple.offsetHeight / 2 + "px";
    ripple.style.left = event.clientX - left - ripple.offsetWidth / 2 + "px";
    ripple.classList.add("rippleEffect");
    setTimeout(() => {
      installButton.removeChild(ripple);
      setButtonClicked(true);
    }, 500);
  };

  useEffect(() => {
    window.open("https://store.steampowered.com/about/");
    setButtonClicked(false);
  }, [buttonClicked]);

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
              ref={installButton}
              onClick={(event) => {
                installButtonClick(event);
              }}
              radius="xl"
              size="md"
              sx={(theme) => ({
                padding: "0 40px",
                backgroundColor: `${theme.colors.primary[5]} !important`,
                transition: "all 0.3s ease-in-out",
                transitionProperty: "opacity, transform",
                "&:hover": {
                  opacity: "0.8",
                  transform: "scale(1.05)",
                },
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
