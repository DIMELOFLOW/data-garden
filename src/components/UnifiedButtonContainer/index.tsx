import React, { FC } from "react";
import { FormatButton } from "../FormatButton";

type IProps = {
  side: "left" | "right";
  onButtonClick: () => void;
  onSelectFormat: (format: string) => void;
  selectedFormat: string | null;
};

export const UnifiedButtonContainer: FC<IProps> = ({
  side,
  onButtonClick,
  onSelectFormat,
  selectedFormat,
}) => {
  const onHandleButtonClick = (format: string) => {
    onButtonClick();
    onSelectFormat(format);
  };

  return (
    <div className={`buttonContainer${side}`}>
      {Object.entries({
        CSV: "CSV",
        "application/json": "JSON",
      }).map(([keyFormat, value], i) => (
        <FormatButton
          key={i}
          format={keyFormat}
          text={value}
          handleClick={() => onHandleButtonClick(keyFormat)}
          selectedFormat={selectedFormat}
        />
      ))}
    </div>
  );
};
