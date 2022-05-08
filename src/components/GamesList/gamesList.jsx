import { Text, Title, Loader, useMantineTheme } from "@mantine/core";
import { MakeAnimated } from "../Animation/animation";
import { ReactComponent as WindowsIcon } from "../../assets/windowsIcon.svg";

function GameList(props) {
  const { games, isLoadingGames } = props;
  const theme = useMantineTheme();

  return (
    <div className="w-[95%] my-6 flex items-center flex-col">
      {games.map((game) => (
        <div
          key={game.id}
          className="w-full my-6 justify-between flex rounded-3xl overflow-hidden shadow-md
            flex-col xl:flex-row
            transition-all duration-300 ease-in-out
            hover:opacity-90 hover:backdrop-brightness-125 hover:scale-[1.01]"
          style={{
            backgroundColor: theme.colors.primary[12],
          }}
        >
          <div className="flex flex-col items-center w-full xl:flex-row">
            <MakeAnimated
              className="w-full xl:w-auto h-full overflow-hidden cursor-pointer"
              animation="ripple"
              color="#fff"
              size={20}
              delay={500}
              action={() => {
                window.open(game.link);
              }}
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full xl:w-[36rem] h-full min-h-[280px] object-cover hover:scale-110 transition-scale duration-1000 ease-in-out"
              />
            </MakeAnimated>

            <div className="max-w-md mt-6 xl:mt-12 xl:ml-12 flex flex-col items-center text-center xl:text-left xl:inline-block">
              <Title
                sx={{
                  fontSize: "1.8rem",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                {game.title}
              </Title>
              <Text size="xl" sx={{ color: "white", opacity: "0.5" }}>
                {game.tags.join(", ")}
              </Text>
              {/* Divisor */}
              <div className="w-36 h-3 my-3 sm:my-8 rounded-2xl bg-[#214B6B]" />
            </div>
          </div>
          <div className="flex relative">
            <WindowsIcon className="absolute top-4 xl:top-8 right-8" />
            <Text
              className="px-8 py-0 xl:py-4"
              sx={{
                placeSelf: "flex-end",
                fontSize: "3rem",
                fontWeight: "700",
                color: "white",
              }}
            >
              {game.price ? `$${game.price.toFixed(2)}` : "Free"}
            </Text>
          </div>
        </div>
      ))}
      {isLoadingGames ? (
        <Loader
          color="gray"
          size={48}
          sx={{
            marginTop: "5rem",
          }}
        />
      ) : (
        <div className="mt-32"></div>
      )}
    </div>
  );
}

export default GameList;
