import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts/Layout";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonCardGrid } from "../components/PokemonGridCard";
import { PokemonListResponse, SmallPokemon } from "../interfaces";

interface Props {
  pokemons: SmallPokemon[];
}

const Home = ({ pokemons }: Props) => {
  return (
    <Layout title="Pokemons List">
      <PokemonCardGrid pokemons={pokemons} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { results } = (
    await pokeApi.get<PokemonListResponse>("/pokemon?limit=151")
  ).data;

  const pokemons: SmallPokemon[] = results.map((el, i) => ({
    ...el,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      1 + i
    }.svg`,
    id: 1 + i,
  }));

  return {
    props: { pokemons },
  };
};

export default Home;
