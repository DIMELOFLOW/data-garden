"use client";

import { useState, FC } from "react";
import {
  NextButton,
  DataInstructions,
  UnifiedButtonContainer,
} from "@components";

const YourComponent: FC = () => {
  const [, setLeftButtonPressed] = useState(false);
  const [, setRightButtonPressed] = useState(false);

  const [selectedFormatLeft, setSelectedFormatLeft] = useState<string | null>(
    null
  );
  const [selectedFormatRight, setSelectedFormatRight] = useState<string | null>(
    null
  );

  const handleLeftButtonClick = () => {
    setLeftButtonPressed(true);
  };

  const handleRightButtonClick = () => {
    setRightButtonPressed(true);
  };

  const handleFormatSelection = (format: string, side: "left" | "right") => {
    const oppositeSideSelectedFormat =
      side === "left" ? selectedFormatRight : selectedFormatLeft;

    if (oppositeSideSelectedFormat === format) {
      return alert("You cannot select the same format on both sides");
    }

    const updateFunction =
      side === "left" ? setSelectedFormatLeft : setSelectedFormatRight;
    const storageKey =
      side === "left" ? "selectedFormatLeft" : "selectedFormatRight";

    updateFunction(format);
    localStorage.setItem(storageKey, format);
  };

  const isValidSelection =
    selectedFormatLeft !== null && selectedFormatRight !== null;

  const isNextButtonEnabled =
    isValidSelection &&
    ((selectedFormatLeft === "application/json" &&
      selectedFormatRight === "CSV") ||
      (selectedFormatLeft === "CSV" &&
        selectedFormatRight === "application/json"));

  return (
    <>
      <div className="title">
        <h1>Transform Your Data Into Action</h1>
      </div>
      <div className="container">
        <UnifiedButtonContainer
          side="right"
          onButtonClick={handleRightButtonClick}
          onSelectFormat={(format) => handleFormatSelection(format, "right")}
          selectedFormat={selectedFormatRight}
        />
        <UnifiedButtonContainer
          side="left"
          onButtonClick={handleLeftButtonClick}
          onSelectFormat={(format) => handleFormatSelection(format, "left")}
          selectedFormat={selectedFormatLeft}
        />
      </div>
      <DataInstructions />
      <NextButton disabled={!isNextButtonEnabled} />
    </>
  );
};

export default YourComponent;
