"use client";

import { FC, useContext, useState } from "react";
import Link from "next/link";

import { NextButton } from "@components";
import { UploadFiles } from "./components/";
import Button from "@mui/material/Button";
import { FileUrlContext, FileUrlContextProvider } from "@/context/FileUrlContext";
import { downloadFile } from "./libs/format-conversion";


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
  const {dataUrl} = useContext(FileUrlContext);
  
  return (
    <FileUrlContextProvider>
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
              path: " ",
              disabled: !validFile,
              onClick: () => downloadFile(dataUrl)
            }}
          
          />
        
      </div>
    </>
    </FileUrlContextProvider>
  );
};

export default UploadPage;
