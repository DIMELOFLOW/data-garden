"use client"

import React from "react";
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import Button from "@mui/material/Button";

import { downloadFile } from "../upload-page/libs/format-conversion";
import { Constants } from "@helpers";
import { useFileUrlContext } from "@/context/FileUrlContext";

const { FILE_SELECTED_FORMATS } = Constants;

export default function ReadyFile() {

  const retrievedFileTypeRight = localStorage.getItem(
    FILE_SELECTED_FORMATS.SELECTEDFORMATRIGHT
  );

  const { dataUrl } = useFileUrlContext();

  return (
    <div className="contain">
      <div className="title">
        <h1>Dowloand File</h1>
      </div>
      <div className="containerIconFile">
        <Avatar sx={{ width: 174, height: 174 }} >
        <FolderIcon sx={{ width: 134, height: 134 }}  />
        </Avatar>
      </div>
      <div>
        <Button className="next-button" variant="contained"  onClick={() => downloadFile(dataUrl, retrievedFileTypeRight)}>
          DOWLOAND
        </Button>
      </div>
  </div>
  )
}

