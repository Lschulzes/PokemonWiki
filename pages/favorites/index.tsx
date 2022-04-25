import React, { useEffect, useState } from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts/Layout";
import { PokemonCardGrid } from "../../components/PokemonGridCard";
import { NoFavorites } from "../../components/UI/NoFavorites";
import { useFavorites } from "../../hooks/useFavorites";
import { PokemonListResponse } from "../../interfaces";

const FavoritesPage = () => {
  const { favorites, allPokemons } = useFavorites();

  const pokemons = allPokemons
    .filter((el) => favorites.includes(el.name))
    .map((el, i) => ({
      ...el,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        1 + i
      }.svg`,
      id: 1 + i,
    }));

  return (
    <Layout title="Pokemons - Favorites">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <NoFavorites />
      ) : (
        <PokemonCardGrid pokemons={pokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
