import styled from "styled-components";
import { Container, Grid, Progress, Text, Tooltip } from "@nextui-org/react";
import React from "react";
import { Stat } from "../../interfaces";
import { GiHealthPotion } from "react-icons/gi";
import { GenIcon, IconBase } from "react-icons";
import DynamicIcon from "../DynamicIcon";
import { RevertSlug } from "../../helpers";

interface Props {
  stats: Stat[];
}

const PokemonStats = ({ stats }: Props) => {
  return (
    <StyledPokemonStats>
      {stats.map((stat, i) => (
        <Stat key={i} stat={stat} />
      ))}
    </StyledPokemonStats>
  );
};

enum StatIcon {
  "hp" = "Gi/GiHealthPotion",
  "attack" = "Gi/GiAxeSword",
  "defense" = "Gi/GiShieldBounces",
  "special-attack" = "Gi/GiCometSpark",
  "special-defense" = "Gi/GiDefensiveWall",
  "speed" = "Gi/GiRunningShoe",
}

const Stat = ({ stat }: { stat: Stat }) => {
  if (!stat.stat?.name) return <></>;
  return (
    <StyledStat>
      <IconRow>
        <Text>{stat.base_stat}</Text>
        <Tooltip content={RevertSlug(stat.stat?.name)}>
          <DynamicIcon
            color="#0ec880"
            size={"24px"}
            // @ts-ignore
            icon={StatIcon[stat.stat?.name]}
          />
        </Tooltip>
      </IconRow>
      <Progress
        color={"gradient"}
        value={stat.base_stat}
        max={160}
        size={"sm"}
      />
    </StyledStat>
  );
};

const IconRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const StyledPokemonStats = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledStat = styled.div`
  width: 100%;
  max-width: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

export default PokemonStats;
