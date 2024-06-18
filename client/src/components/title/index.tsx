import React from "react";
import { useRouterContext, type TitleProps } from "@refinedev/core";
import Button from "@mui/material/Button";

import logo from "../../assets/mclogo2.png";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Yariga" width="28px" />
        ) : (
          <img src={logo} alt="MCLAREN" width="140px" />
        )}
      </Link>
    </Button>
  );
};
