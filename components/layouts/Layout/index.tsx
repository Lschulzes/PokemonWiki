import Head from "next/head";
import { ReactChildren, ReactNode } from "react";
import { NavBar } from "../../UI";
import styled from "styled-components";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ?? "Pokemon App"}</title>
        <meta name="author" content="Lucas Schulze" />
        <meta name="description" content="Pokemon XXX descriptiion" />
        <meta name="keywords" content={`${title}pokemon, XXX, pokedex`} />
      </Head>
      <NavBar />
      <StyledMain>{children}</StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  padding: 0 20px;
`;
