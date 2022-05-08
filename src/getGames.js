import { supabase } from "./supabaseClient";

async function* getGames(...args) {
  const [number, sort, search] = args;

  function supaQuery() {
    if (!number) {
      throw new Error("Number is required");
    }

    let query = supabase.from("steam").select("*");

    if (!sort && !search) {
      return query;
    }

    if (sort) {
      query = query.order(sort, { ascending: true });
    }

    if (search) {
      query = query.textSearch("title", `${search}:*`, {
        type: "plain",
        config: "english",
      });
    }

    return query;
  }

  async function* getQuery(number) {
    let i = 0;
    let k = number - 1;
    let games = [];

    while (true) {
      let { data, error, status } = await supaQuery().range(i, k);
      i += number;
      k += number;

      if (!data) {
        break;
      }

      if (error && status !== 406) {
        throw error;
      }

      games = games.concat(data);

      yield games;
    }
  }

  yield* getQuery(number);
}

export default getGames;
