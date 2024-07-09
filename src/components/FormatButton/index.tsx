"use client";

import React, { FC, useState, useEffect } from "react";

import { ButtonStyled } from "./components";

type IProps = {
  text: string;
  format: string;
  handleClick: (format: string) => void;
  selectedFormat?: string | null;
};
export const FormatButton: FC<IProps> = ({
  text,
  format,
  handleClick,
  selectedFormat,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (selectedFormat === format) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [selectedFormat, format]);

  return (
    <ButtonStyled
      {...{
        checked,
        variant: "contained",
        onClick: () => {
          handleClick(format);
        },
      }}
    >
      {text}
    </ButtonStyled>
  );
};
