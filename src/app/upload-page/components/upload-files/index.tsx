"use client";

import { ChangeEvent, FC, useRef } from "react";

export const UploadFiles: FC = () => {
  const fileInput = useRef<HTMLInputElement>(null);

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const existFiles = e.target.files;
    if (!existFiles || !existFiles.length) {
      return alert("No valid file");
    }

    const [file]: File[] = Array.from(existFiles) ?? ([] as File[]);

    const bytesToMb = 1024 * 1024;
    const isGreaterThan100Mb = file.size / bytesToMb > 100;

    if (isGreaterThan100Mb) {
      if (fileInput.current) {
        fileInput.current.value = "";
      }
      return alert("File size should be less than 100Mb");
    }

    const fileTypeMap = {
      csv: "CSV",
      "application/json": "JSON",
    };

    const retrievedFileType = localStorage.getItem("selectedFormatLeft");
    const isRightFormatType =
      fileTypeMap[file.type as keyof typeof fileTypeMap] !== retrievedFileType;

    if (isRightFormatType) {
      if (fileInput.current) {
        fileInput.current.value = "";
      }
      return alert(`File should be type ${retrievedFileType}`);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" onChange={onHandleChange} ref={fileInput} />
    </div>
  );
};
