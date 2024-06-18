import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BackgroundImage from '../assets/background.jpg';
import MyLogo from '../assets/mclogo2.png';
import MyName from '../assets/byelyarenom.png';


import { CredentialResponse } from "../interfaces/google";

// Updated google client ID
const GOOGLE_CLIENT_ID =
  "283807521409-99g43hrpme10qrg70rea0ktd6qfo8ib6.apps.googleusercontent.com";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "outline",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
         <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="16px"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap="10px">
          <img src={MyLogo} alt="My Logo" style={{ width: '240px', height: '110px' }} />
        </Box>

        <GoogleButton />

        <Box display="flex" alignItems="center" justifyContent="center" gap="10px">
          <img src={MyName} alt="My Logo" style={{ width: '100px', height: '20px' }} />
        </Box>

      </Box>
    </Container>
  );
};
