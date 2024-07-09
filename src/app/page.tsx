"use client";

import { useState, FC, useEffect } from "react";
import {
  NextButton,
  DataInstructions,
  UnifiedButtonContainer,
} from "@components";
import { Constants } from "@helpers";

const { FILE_FORMATS, FILE_SELECTED_FORMATS, FILE_SIDES } = Constants;

const YourComponent: FC = () => {
  const [, setLeftButtonPressed] = useState<boolean>(false);
  const [, setRightButtonPressed] = useState<boolean>(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] =
    useState<boolean>(false);

  const [selectedFormatLeft, setSelectedFormatLeft] = useState<string | null>(
    null
  );
  const [selectedFormatRight, setSelectedFormatRight] = useState<string | null>(
    null
  );

  useEffect(() => {
    const isValidSelection =
      selectedFormatLeft !== null && selectedFormatRight !== null;

    const selectedValidFormat =
      isValidSelection &&
      ((selectedFormatLeft === FILE_FORMATS.JSON &&
        selectedFormatRight === FILE_FORMATS.CSV) ||
        (selectedFormatLeft === FILE_FORMATS.CSV &&
          selectedFormatRight === FILE_FORMATS.JSON));

    setIsNextButtonEnabled(selectedValidFormat);
  }, [selectedFormatLeft, selectedFormatRight]);

  const handleLeftButtonClick = () => {
    setLeftButtonPressed(true);
  };

  const handleRightButtonClick = () => {
    setRightButtonPressed(true);
  };

  const handleFormatSelection = (format: string, side: "left"   | "right") => {
    const currentSideFormat = side === FILE_SIDES.LEFT ? selectedFormatLeft : selectedFormatRight;
    const oppositeSideFormat = side === FILE_SIDES.LEFT ? selectedFormatRight : selectedFormatLeft;
  
    if (currentSideFormat === format && oppositeSideFormat === format) {
      const otherSideUpdateFunction = side === FILE_SIDES.LEFT ? setSelectedFormatRight : setSelectedFormatLeft;
      const otherSideStorageKey = side === FILE_SIDES.LEFT ? FILE_SELECTED_FORMATS.SELECTEDFORMATRIGHT : FILE_SELECTED_FORMATS.SELECTEDFORMATLEFT;
      otherSideUpdateFunction(null);
      localStorage.removeItem(otherSideStorageKey);
    } else {
      const updateFunction = side === FILE_SIDES.LEFT ? setSelectedFormatLeft : setSelectedFormatRight;
      const storageKey = side === FILE_SIDES.LEFT ? FILE_SELECTED_FORMATS.SELECTEDFORMATLEFT : FILE_SELECTED_FORMATS.SELECTEDFORMATRIGHT
      updateFunction(format);
      localStorage.setItem(storageKey, format);
    }
  };

  return (
    <>
      <div className="title">
        <h1>Transform Your Data Into Action</h1>
      </div>
      <div className="container">
        <UnifiedButtonContainer
          side="left"
          onButtonClick={handleLeftButtonClick}
          onSelectFormat={(format) => handleFormatSelection(format, "left")}
          selectedFormat={selectedFormatLeft}
        />
        <UnifiedButtonContainer
          side="right"
          onButtonClick={handleRightButtonClick}
          onSelectFormat={(format) => handleFormatSelection(format, "right")}
          selectedFormat={selectedFormatRight}
        />
      </div>
      <DataInstructions />
      <NextButton path="/upload-page" disabled={!isNextButtonEnabled} />
    </>
  );
};

export default YourComponent;
