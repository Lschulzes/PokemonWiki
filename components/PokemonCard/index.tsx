import { Grid, Card, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SmallPokemon } from "../../interfaces";

export const PokemonCard = ({ pokemon }: { pokemon: SmallPokemon }) => {
  const { id, img, name, url } = pokemon;
  const { push } = useRouter();
  const onClick = () => push(`/pokemon/${pokemon.name}`);

  return (
    <Grid onClick={onClick} xs={6} sm={3} md={2} xl={1} key={id}>
      <Card hoverable clickable>
        <Card.Body css={{ p: 1, pt: 6 }}>
          <Card.Image src={img} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{name}</Text>
            <Text>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
