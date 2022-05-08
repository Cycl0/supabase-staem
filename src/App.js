import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import debounce from "lodash.debounce";
import getGames from "./getGames";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import { Text, Title } from "@mantine/core";
import AppShell from "./components/Appshell/appshell";
import Header from "./components/Header/header";
import Button from "./components/Button/button";
import { ReactComponent as InstallIcon } from "./assets/installIcon.svg";
import Carousel from "./components/Carousel/carousel";
import Search from "./components/Search/search";
import GamesList from "./components/GamesList/gamesList";

const App = () => {
  const [gamesBundle, setGamesBundle] = useState(getGames(10, "title"));

  const [loading, setLoading] = useState(false);

  const [games, setGames] = useState([]);
  const [carouselGames, setCarouselGames] = useState([]);

  useEffect(() => {
    fetchInitialGames();
  }, []);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");

  useEffect(() => {
    if (search || sort) {
      setGamesBundle(getGames(10, sort, search));
    }
  }, [search, sort]);

  useEffect(() => {
    fetchFilteredGames();
  }, [gamesBundle]);

  const fetchFilteredGames = debounce(async () => {
    const gamesList = await gamesBundle.next();
    const games = gamesList.value;
    setGames(games);
  }, 500);

  const onSearchHandler = (event) => {
    setSearch(event.target.value);
  };

  const fetchInitialGames = async () => {
    try {
      setLoading(true);

      const gamesList = await gamesBundle.next();
      const games = gamesList.value;

      if (games) {
        setGames(games);
        const randomGames = getRandomGames(games, 6);
        setCarouselGames(randomGames);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreGames = async () => {
    try {
      const gamesList = await gamesBundle.next();
      let games = gamesList.value;
      if (games) {
        setGames(games);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreGames, 600);

  const [isLoadingGames, setIsLoadingGames] = useState(false);

  useEffect(() => {
    if (isFetching) {
      setIsLoadingGames(true);
    } else {
      setIsLoadingGames(false);
    }
  }, [isFetching]);

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
          <Title sx={{ fontWeight: "700", fontSize: "40px", color: "white" }}>
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

      <div className="flex flex-column items-center relative mb-8">
        {/* Divisor */}
        <div className="w-36 h-3 absolute -left-40 rounded-2xl bg-[#214B6B]" />
        <Title
          className="min-w-[14rem] text-[1.75rem] sm:text-[2.5rem]"
          sx={{ fontWeight: "700", color: "white" }}
        >
          New & Trending
        </Title>
        {/* Divisor */}
        <div className="w-36 h-3 ml-4 rounded-2xl bg-[#214B6B]" />
      </div>

      <Search onSearch={onSearchHandler} setSort={setSort} sort={sort} />
      <GamesList games={games} isLoadingGames={isLoadingGames} />
    </AppShell>
  );
};

export default App;
