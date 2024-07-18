"use client";

import { FC, useState } from "react";

import Link from "next/link";

import Button from "@mui/material/Button";
import { NextButton } from "@components";
import { UploadFiles } from "./components/";
import { useCheckLocalStorageAndRedirect, useClearLocalStorage } from "@/hooks/checkLocalStorage";

const BackButton = () => (
  <div className="container">
    <Link href="/">
      <Button variant="outlined" color="warning" onClick={ () => useClearLocalStorage()}>
        BACK
      </Button>
    </Link>
  </div>
);

const UploadPage: FC = () => {
  const [validFile, setValidFile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
 
  useCheckLocalStorageAndRedirect()

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
