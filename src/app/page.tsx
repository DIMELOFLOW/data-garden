'use client'

import Link from 'next/link';
import { useState } from 'react';
import { FC } from "react";
import { useEffect } from 'react';

type ButtonContainerPropsLeft = {
  onLeftButtonClick: () => void;
  onSelectFormat: (format: string) => void;
};

type ButtonContainerPropsRight = {
  onRightButtonClick: () => void;
  onSelectFormat: (format: string) => void;
};

const ButtonContainerLeft = ({ onLeftButtonClick, onSelectFormat }: ButtonContainerPropsLeft) => (
  <div className="button-container-left">
    <button onClick={() => { onLeftButtonClick(); onSelectFormat('CSV'); }}>CSV</button>
    <button onClick={() => { onLeftButtonClick(); onSelectFormat('JSON'); }}>JSON</button>
    <button onClick={() => { onLeftButtonClick(); onSelectFormat('JSONL'); }}>JSONL</button>
  </div>
);

const ButtonContainerRight = ({ onRightButtonClick, onSelectFormat }: ButtonContainerPropsRight) => (
  <div className="button-container-right">
    <button onClick={() => { onRightButtonClick(); onSelectFormat('JSON'); }}>JSON</button>
    <button onClick={() => { onRightButtonClick(); onSelectFormat('CSV'); }}>CSV</button>
    <button onClick={() => { onRightButtonClick(); onSelectFormat('JSONL'); }}>JSONL</button>
  </div>
);

const NextButton = ({ isDisabled }: { isDisabled: boolean }) => (
  <div className="container">

    <Link href="/uploadPage">
      <button className='next-button' disabled={isDisabled} >NEXT</button>
    </Link>
  </div>
);

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

  const isNextButtonEnabled = leftButtonPressed && rightButtonPressed;

  const handleFormatSelectionLeft = (format: string) => {
    setSelectedFormatLeft(format);
  }

  const handleFormatSelectionRight = (format: string) => {
    setSelectedFormatRight(format);
  }

  // useEffect(() => {
  //   console.log("Formato seleccionado derecho:", selectedFormatLeft);
  //   console.log("Formato seleccionado izquierdo:", selectedFormatRight);
  // }, [selectedFormatLeft, selectedFormatRight]); // observe changes

  return (
    <>
      <div className="container">
        <ButtonContainerLeft onLeftButtonClick={handleLeftButtonClick} onSelectFormat={handleFormatSelectionLeft} />
        <ButtonContainerRight onRightButtonClick={handleRightButtonClick} onSelectFormat={handleFormatSelectionRight} />
      </div>
      <NextButton isDisabled={!isNextButtonEnabled} />
    </>
  );
};

export default YourComponent;