import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Text, Title } from "@mantine/core";
import AppShell from "./components/Appshell/appshell.jsx";
import Header from "./components/Header/header";
import Button from "./components/Button/button";
import { ReactComponent as InstallIcon } from "./assets/installIcon.svg";
import Carousel from "./components/Carousel/carousel";

const App = () => {
  const [data, setData] = useState([]);
  const [carouselGames, setCarouselGames] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <AppShell
      loading={loading}
      header={
        <Header>
          <Title
            style={{ fontWeight: "700", fontSize: "40px", color: "white" }}
          >
            STAEM
          </Title>
          <Button
            onButtonClick={() =>
              window.open("https://store.steampowered.com/about/")
            }
          >
            <InstallIcon />
            <Text ml="sm">Install</Text>
          </Button>
        </Header>
      }
    >
      <Carousel games={carouselGames} />
    </AppShell>
  );
};

export default App;
