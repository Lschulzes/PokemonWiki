import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts/Layout";
import PokemonStats from "../../components/PokemonStats";
import { RevertSlug } from "../../helpers";
import { useFavorites } from "../../hooks/useFavorites";
import { Pokemon as PokemonData, PokemonListResponse } from "../../interfaces";

interface PokemonProps {
  pokemon: PokemonData;
}

export const Pokemon = ({ pokemon }: PokemonProps) => {
  const { toggleFavorite, isFavorited } = useFavorites();
  const favorited = isFavorited(String(pokemon.id) ?? "");
  const onToggleFavorite = () => toggleFavorite(String(pokemon.id) || "");

  return (
    <Layout title={`${pokemon.name}`}>
      <Grid.Container gap={2} css={{ marginTop: "1rem" }}>
        <Grid xs={12} sm={6}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites?.other?.dream_world?.front_default ??
                  "/no-image.png"
                }
                alt={pokemon.name}
                width={"100%"}
                height={100}
              />
            </Card.Body>
            <Card.Footer>
              <PokemonStats stats={pokemon.stats || []} />
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Card>
            <Card.Header
              css={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Text h1>{RevertSlug(pokemon.name + "")}</Text>

              <Button color={"gradient"} ghost onClick={onToggleFavorite}>
                {favorited ? "Remove from" : "Add to"} Favorites
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction="row" wrap="nowrap" display="flex" gap={0}>
                <Card.Image
                  src={pokemon.sprites?.front_default ?? "/no-image.png"}
                  alt={pokemon.name}
                  width={"100%"}
                  height={100}
                />
                <Card.Image
                  src={pokemon.sprites?.back_default ?? "/no-image.png"}
                  alt={pokemon.name}
                  width={"100%"}
                  height={100}
                />
                <Card.Image
                  src={pokemon.sprites?.front_shiny ?? "/no-image.png"}
                  alt={pokemon.name}
                  width={"100%"}
                  height={100}
                />
                <Card.Image
                  src={pokemon.sprites?.back_shiny ?? "/no-image.png"}
                  alt={pokemon.name}
                  width={"100%"}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  return {
    paths: data.results.map((el) => ({ params: { name: el.name } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  let pokemon = {};

  try {
    const { data } = await pokeApi.get<PokemonData>(`/pokemon/${name}`);

    if (!data.id) throw new Error();

    pokemon = {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      stats: data.stats,
    };
  } catch (error) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return { props: { pokemon }, revalidate: 60 * 60 * 24 };
};

export default Pokemon;
