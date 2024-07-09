import { FC } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

type ButtonStyledProps = Parameters<typeof Button>[0] & { checked: boolean };

export const ButtonStyled: FC<ButtonStyledProps> = styled(Button)`
  ${(props) => (props.checked ? "background:#15297c" : "")};
`;
