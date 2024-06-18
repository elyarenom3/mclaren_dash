import React, { PropsWithChildren } from "react";
import { ThemedLayoutV2 } from "@refinedev/mui";
import { ThemedTitleV2 } from "./layout/title";
import { Header } from "./header";
import { ThemedSiderV2 } from "./layout/sider";
import { Box } from "@mui/material";

const CustomLayout: React.FC<PropsWithChildren> = ({ children, ...props }) => (
  <Box
    sx={{
      backgroundColor: "#ffffff", // Set the background color to white
      minHeight: "100vh", // Ensure it covers the full height of the viewport
      padding: 0, // Remove any padding if necessary
      margin: 0, // Remove any margin if necessary
    }}
  >
    <ThemedLayoutV2 Title={ThemedTitleV2} Header={Header} Sider={ThemedSiderV2} {...props}>
      {children}
    </ThemedLayoutV2>
  </Box>
);

export default CustomLayout;
