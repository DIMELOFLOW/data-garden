"use client";

import { FC, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import { NextButton } from "@components";
import { UploadFiles } from "./components/";
import { Constants } from "@helpers";

const { FILE_SELECTED_FORMATS } = Constants;

function clearLocalStorageKey(): void {
  if (typeof window.localStorage !== 'undefined') {
    window.localStorage.clear();
  }
}

const BackButton = () => (
  <div className="container">
    <Link href="/">
      <Button variant="outlined" color="warning" onClick={ () => clearLocalStorageKey()}>
        BACK
      </Button>
    </Link>
  </div>
);

const UploadPage: FC = () => {
  const [validFile, setValidFile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if(!localStorage.getItem(FILE_SELECTED_FORMATS.SELECTEDFORMATRIGHT) || !localStorage.getItem(FILE_SELECTED_FORMATS.SELECTEDFORMATLEFT)) {
      router.push('/')
    }
    }, []); 

  const onHandleValidFile = () => setValidFile(true);
  const setHowLoading = () => setLoading(true);
  const setHowAlreadyLoad = () => setLoading(false);

  return (
    <>
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
        <BackButton />

        <NextButton
          {...{
            path: "/ready-file",
            disabled: !validFile || loading,
          }}
        />
      </div>
    </>
  );
};

export default UploadPage;
