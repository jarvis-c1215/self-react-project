import styled, { ThemeProvider } from "styled-components";

import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const darkTheme = {
  mode: "dark",
  nav: "dark",
  siteLogo: "#fff",
  background: "#0d0d0d",
  backgroundOverlay: '#0d0d0d66',
  bootstrapCardTextBackground1: "#313336",
  bootstrapCardTextBackground2: "#1c1c1c",
  bootstrapText: "light",
  text: "#fff",
  highlight: "#fff",
  inputBackground: "#222529"
};

const lightTheme = {
  mode: "light",
  nav: "light",
  siteLogo: "#0533e8",
  background: "#fff",
  backgroundOverlay: '#ffffffbb',
  bootstrapTextBackground1: "#E6E9EC",
  bootstrapTextBackground2: "#fff",
  bootstrapText: "dark",
  text: "#1c1c1c",
  highlight: "blue",
  inputBackground: "#fff"
};

export default function RootLayout() {
  const [query, setQuery] = useState("");
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedIsDarkMode = localStorage.getItem("isDarkMode");
    if (storedIsDarkMode === "1") {
      setDarkMode(true);
    }
  }, []);

  const saveSearchInputHandler = (searchInput) => {
    setQuery(searchInput);
  };

  const darkMarkToggleHandler = () => {
    setDarkMode((prevIsDarkMode) => {
      if (prevIsDarkMode === true) localStorage.setItem("isDarkMode", "0");
      else {
        localStorage.setItem("isDarkMode", "1");
      }
      return !prevIsDarkMode;
    });
  };

  return (
    <ThemeProvider
      theme={isDarkMode ? darkTheme : lightTheme}
    >
      <Wrapper className="pageLayoutWrapper">
        <NavBar
          onSearchInput={saveSearchInputHandler}
          passSearch={query}
          onDarkModeToggle={darkMarkToggleHandler}
        />
        <Outlet context={[query, setQuery]} />  {/* Tell where to render the nested content*/}
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  * {
    transition: background-color 0.5s linear;
  }

  input, input: focus {
    color: ${(props) => props.theme.text}
  }
`