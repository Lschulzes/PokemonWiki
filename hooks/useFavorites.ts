import { useCallback, useEffect, useMemo, useState } from "react";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [allPokemons, setAllPokemons] = useState<SmallPokemon[]>([]);

  useEffect(() => {
    const favoritesFromLocal = localStorage.getItem("favorites_pokemon");
    if (!favoritesFromLocal) return;
    setFavorites(JSON.parse(favoritesFromLocal));
  }, []);

  useEffect(() => {
    pokeApi.get<PokemonListResponse>("/pokemon?limit=151").then((el) => {
      setAllPokemons(el.data.results);
    });
  }, []);

  const toggleFavorite = useCallback(
    (slug: string) => {
      let newFavorites: any = [];
      if (favorites.findIndex((el) => el === slug) >= 0) {
        newFavorites = favorites.filter((el) => el !== slug);
      } else {
        newFavorites = favorites.concat([slug]);
      }
      setFavorites(newFavorites);
      localStorage.setItem("favorites_pokemon", JSON.stringify(newFavorites));
    },
    [favorites]
  );

  const isFavorited = useCallback(
    (slug: string) => {
      return favorites.includes(slug);
    },
    [favorites]
  );

  return useMemo(
    () => ({ toggleFavorite, favorites, isFavorited, allPokemons }),
    [favorites, toggleFavorite, isFavorited, allPokemons]
  );
};
