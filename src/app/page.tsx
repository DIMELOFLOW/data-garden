"use client";

import { useState, FC, } from "react";
import NextButton from "@/components/NextButton/nextButton";
import UnifiedButtonContainer from "@/components/UnifiedButtonContainer/unifiefButton";
import DataInstructions from "@/components/DataInstructions/dataInstructions";

const YourComponent: FC = () => {
  const [leftButtonPressed, setLeftButtonPressed] = useState(false);
  const [rightButtonPressed, setRightButtonPressed] = useState(false);
  const [selectedFormatLeft, setSelectedFormatLeft] = useState<string | null>(null);
  const [selectedFormatRight, setSelectedFormatRight] = useState<string | null>(null);

  const handleLeftButtonClick = () => {
    setLeftButtonPressed(true);
  };

  const handleRightButtonClick = () => {
    setRightButtonPressed(true);
  };

  const handleFormatSelection = (format: string, side: 'left' | 'right') => {
    const oppositeSideSelectedFormat = side === 'left' ? selectedFormatRight : selectedFormatLeft;
    
    if (oppositeSideSelectedFormat === format) {
      alert('You cannot select the same format on both sides');
      return;
    }
  
    const updateFunction = side === 'left' ? setSelectedFormatLeft : setSelectedFormatRight;
    const storageKey = side === 'left' ? "selectedFormatLeft" : "selectedFormatRight";
  
    updateFunction(format);
    localStorage.setItem(storageKey, format);
  };

  const isValidSelection = (): boolean => {
    return selectedFormatLeft !== null && selectedFormatRight !== null;
  }

  const isNextButtonEnabled = isValidSelection() && ((selectedFormatLeft === "application/json" && selectedFormatRight === "CSV") || (selectedFormatLeft === "CSV" && selectedFormatRight === "application/json"));

  return (
    <>
      <div className="title">
          <h1>Transform Your Data Into Action</h1>
        </div>
      <div className="container">        
        <UnifiedButtonContainer
          side="right"
          onButtonClick={handleRightButtonClick}
          onSelectFormat={(format) => handleFormatSelection(format, 'right')}
          selectedFormat={selectedFormatRight}
        />
        <UnifiedButtonContainer
          side="left"
          onButtonClick={handleLeftButtonClick}
          onSelectFormat={(format) => handleFormatSelection(format, 'left')}
          selectedFormat={selectedFormatLeft}
        />
      </div>
      <DataInstructions/>
      <NextButton disabled={!isNextButtonEnabled}  />
    </>
  );
};

export default YourComponent;
