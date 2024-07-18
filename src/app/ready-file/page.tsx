"use client"

import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";
import Link from "next/link"; 

import { downloadFile } from "../upload-page/libs/format-conversion";
import { Constants } from "@helpers";
import { useFileUrlContext } from "@/context/FileUrlContext";

const { FILE_SELECTED_FORMATS } = Constants;

export default function ReadyFile() {
  const { dataUrl } = useFileUrlContext();
  const router = useRouter();
  const [selectedFormatRight, setSelectedFormatRight] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rightFormat = window.localStorage.getItem(FILE_SELECTED_FORMATS.SELECTEDFORMATRIGHT);

      setSelectedFormatRight(rightFormat || '');
    }
  }, []);

  useEffect(() => {
    if(!localStorage.getItem(FILE_SELECTED_FORMATS.SELECTEDFORMATRIGHT) || !localStorage.getItem(FILE_SELECTED_FORMATS.SELECTEDFORMATLEFT)) {
      router.push('/')
    } 
  }, []); 

  function clearLocalStorageKey(): void {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.clear();
    }
  }

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
        <Link href="/">
          <Button variant="outlined" 
            color="warning" 
            style={{ marginRight: '30px' }}
            onClick={ () => {
              clearLocalStorageKey()
            }}
          >
            START
          </Button>
        </Link>
        <Button className="next-button" variant="contained"  onClick={() => downloadFile(dataUrl, selectedFormatRight)}>
           DOWLOAND
        </Button>
      </div>
  </div>
  )
}

