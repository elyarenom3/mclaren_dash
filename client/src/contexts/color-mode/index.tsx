// import { ThemeProvider } from "@mui/material/styles";
// import { RefineThemes } from "@refinedev/mui";
// import React, {
//   PropsWithChildren,
//   createContext,
//   useEffect,
//   useState,
// } from "react";

// type ColorModeContextType = {
//   mode: string;
//   setMode: () => void;
// };

// export const ColorModeContext = createContext<ColorModeContextType>(
//   {} as ColorModeContextType
// );

// export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
//   children,
// }) => {
//   const colorModeFromLocalStorage = localStorage.getItem("colorMode");
//   const isSystemPreferenceDark = window?.matchMedia(
//     "(prefers-color-scheme: dark)"
//   ).matches;
//   const systemPreference = "light";

//   const systemPreference = isSystemPreferenceDark ? "dark" : "light";
//   const [mode, setMode] = useState(
//     colorModeFromLocalStorage || systemPreference
//   );

//   useEffect(() => {
//     window.localStorage.setItem("colorMode", mode);
//   }, [mode]);

//   const setColorMode = () => {
//     if (mode === "light") {
//       setMode("dark");
//     } else {
//       setMode("light");
//     }
//   };

//   return (
//     <ColorModeContext.Provider
//       value={{
//         setMode: setColorMode,
//         mode,
//       }}
//     >
//       <ThemeProvider
//         theme={mode === "dark" ? RefineThemes.Orange : RefineThemes.OrangeDark}
//       >
//         {children}
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };


import { ThemeProvider } from "@mui/material/styles";
import { RefineThemes } from "@refinedev/mui";
import React, { PropsWithChildren, createContext } from "react";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const mode = "light"; // Always set to light mode

  const setColorMode = () => {
    // No-op function, does nothing
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ThemeProvider
        // Always use the light theme
        theme={RefineThemes.Orange} 
      >
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

