import { Grid } from "@nextui-org/react";
import { SmallPokemon } from "../../interfaces";
import { PokemonCard } from "../PokemonCard";

export const PokemonCardGrid = ({ pokemons }: { pokemons: SmallPokemon[] }) => {
  return (
    <Grid.Container gap={2} justify="flex-start">
      {pokemons.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </Grid.Container>
  );
};
