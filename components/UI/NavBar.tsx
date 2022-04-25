import { Spacer, StyledLink, Text, theme } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
export const NavBar = () => {
  return (
    <StyledNavBar>
      <Link href={"/"} passHref>
        <StyledLink css={{ display: "flex", alignItems: "center" }}>
          <Image
            width={"100%"}
            height={"100%"}
            src={
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            }
            alt="Squishy purple"
            style={{ cursor: "pointer" }}
          />
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okemon
          </Text>
        </StyledLink>
      </Link>
      <Spacer css={{ flex: 1 }} />
      <Link href={"/favorites"} passHref>
        <StyledLink>
          <Text color="white">Favoritos</Text>
        </StyledLink>
      </Link>
    </StyledNavBar>
  );
};

const StyledNavBar = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 0 20px;
  background-color: ${theme.colors.gray900.value};
`;
