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
      setAllPokemons(
        el.data.results.map((el, i) => ({
          ...el,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
            1 + i
          }.svg`,
          id: 1 + i,
        }))
      );
    });
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      let newFavorites: any = [];
      if (favorites.findIndex((el) => el === id) >= 0) {
        newFavorites = favorites.filter((el) => el !== id);
      } else {
        newFavorites = favorites.concat([id]);
      }
      setFavorites(newFavorites);
      localStorage.setItem("favorites_pokemon", JSON.stringify(newFavorites));
    },
    [favorites]
  );

  const isFavorited = useCallback(
    (id: string) => {
      return favorites.includes(id);
    },
    [favorites]
  );

  return useMemo(
    () => ({ toggleFavorite, favorites, isFavorited, allPokemons }),
    [favorites, toggleFavorite, isFavorited, allPokemons]
  );
};
