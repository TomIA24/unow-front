import styled from "@emotion/styled";
import React from "react";
import Avatar from "@mui/material/Avatar";

export const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 18,
  height: 18,
  // border: `2px solid ${theme.palette.background.paper}`,
}));
