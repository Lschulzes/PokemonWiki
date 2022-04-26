import Head from "next/head";
import { ReactChildren, ReactNode } from "react";
import { NavBar } from "../../UI";
import styled from "styled-components";
import { useRouter } from "next/router";

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ?? "Pokemon App"}</title>
        <meta name="author" content="Lucas Schulze" />
        <meta name="description" content="Pokemon XXX descriptiion" />
        <meta name="keywords" content={`${title}, pokemon, XXX, pokedex`} />
        <meta property="og:title" content={`Info about ${title}`} />
        <meta
          property="og:description"
          content={`This is the page that tells the deets about ${title}`}
        />
        <meta property="og:image" content={`${origin}/images/banner.png`} />
      </Head>
      <NavBar />
      <StyledMain>{children}</StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  padding: 0 20px;
`;
