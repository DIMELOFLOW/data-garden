"use client";

import { FC, useEffect, useState } from "react";

import { NextButton, BackButton } from "@components";
import { UploadFiles } from "./components/";
import { useCheckLocalStorageAndRedirect } from "@/hooks/checkLocalStorage";
import { Constants, localStorage } from "@helpers";

const { FILE_SELECTED_FORMATS } = Constants;
const { clearLocalStorage } =localStorage;

const UploadPage: FC = () => {
  const [validFile, setValidFile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFormatLeft, setSelectedFormatLeft] = useState('');
 
  useCheckLocalStorageAndRedirect()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const leftFormat = window.localStorage.getItem(FILE_SELECTED_FORMATS.SELECTEDFORMATLEFT);
      setSelectedFormatLeft(leftFormat || '');
    }
  }, []);

  const onHandleValidFile = () => setValidFile(true);
  const setHowLoading = () => setLoading(true);
  const setHowAlreadyLoad = () => setLoading(false);

  return (
    <>
      <div className="title">
        <h1>Transform your {selectedFormatLeft}: Upload your file now!</h1>
      </div>
      <div className="container">
        <UploadFiles
          {...{
            onHandleValidFile,
            setHowLoading,
            setHowAlreadyLoad,
          }}
        />
      </div>
      <div className="containerButton">
        <BackButton path="/" onClick={clearLocalStorage}/>
        <NextButton
          {...{
            path: "/map-data",
            disabled: !validFile || loading,
          }}
        />
      </div>
    </>
  );
};

export default UploadPage;
