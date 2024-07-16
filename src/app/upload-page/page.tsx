"use client";

import Link from "next/link";
import { FC, useState } from "react";
import Button from "@mui/material/Button";

import { NextButton } from "@components";
import { UploadFiles } from "./components/";
import { downloadFile } from "./libs/format-conversion";

import { useFileUrlContext } from "@/context/FileUrlContext";

const BackButton = () => (
  <div className="container">
    <Link href="/">
      <Button variant="outlined" color="warning">
        BACK
      </Button>
    </Link>
  </div>
);

const UploadPage: FC = () => {
  const [validFile, setValidFile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { dataUrl } = useFileUrlContext();

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
            path: " ",
            disabled: !validFile || loading,
            onClick: () => downloadFile(dataUrl),
          }}
        />
      </div>
    </>
  );
};

export default UploadPage;
