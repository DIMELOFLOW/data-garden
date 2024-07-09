"use client";

import { FC, useState } from "react";
import Link from "next/link";

import { NextButton } from "@components";
import { UploadFiles } from "./components/";
import Button from "@mui/material/Button";

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
  const onHandleValidFile = () => setValidFile(true);
  return (
    <>
      <div className="container">
        <UploadFiles
          {...{
            onHandleValidFile,
          }}
        />
      </div>
      <div className="containerButton">
        <BackButton />
        <NextButton
          {...{
            path: "/ready-file",
            disabled: !validFile,
          }}
        />
      </div>
    </>
  );
};

export default UploadPage;
