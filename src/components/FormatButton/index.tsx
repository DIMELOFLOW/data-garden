"use client";

import React, { FC, useState, useEffect} from "react";
import styled from "styled-components";

const FormatButtonStyled: FC<{ checked: boolean }> = styled.button`
  background: ${(props) => (props.checked ? "#15297c" : "black")};
  &:hover {
    background-color: #107acc;
  }
`;

export const FormatButton: FC<{
  text: string;
  format: string;
  handleClick: (format: string) => void;
  selectedFormat?: string;
}> = ({ text, format, handleClick, selectedFormat }) => {
  const [checked, setChecked] = useState<boolean>(false);
  
  useEffect(() => {
    if (selectedFormat === format) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [selectedFormat, format]);

  return (
    <FormatButtonStyled
      {...{
        checked,
        onClick: () => {
          handleClick(format);
        },
      }}
    >
      {text}
    </FormatButtonStyled>
  );
};