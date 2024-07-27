"use client";

import { ChangeEvent, FC, useRef } from "react";
import { Constants } from "@helpers";
import { useFileUrlContext } from "@/context/FileUrlContext";
import { FileType, fileTypeMap, transformFile } from "./services";
import { useDataArchiveContext } from "@/context/DataArchiveContext";

const { FILE_SELECTED_FORMATS } = Constants;

type IProps = {
  onHandleValidFile: (data: any) => void;
  setHowLoading: () => void;
  setHowAlreadyLoad: () => void;
};

export const UploadFiles: FC<IProps> = ({
  onHandleValidFile,
  setHowLoading,
  setHowAlreadyLoad,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const { setDataUrl } = useFileUrlContext();
  const { setDataArchive } = useDataArchiveContext();

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

    const retrievedFileType = localStorage.getItem(
      FILE_SELECTED_FORMATS.SELECTEDFORMATLEFT
    );

    const retrievedFileTypeRight = localStorage.getItem(
      FILE_SELECTED_FORMATS.SELECTEDFORMATRIGHT
    );
   
    const isRightFormatType =
      fileTypeMap[file.type as keyof typeof fileTypeMap] !== retrievedFileType;

    if (isRightFormatType) {
      if (fileInput.current) {
        fileInput.current.value = "";
      }
      return alert(`File should be type ${retrievedFileType}`);
    }

    let data: any;

    const fromFile = "CSV";
    setHowLoading();
    transformFile(
      file,
      fileTypeMap[file.type as keyof typeof fileTypeMap] as FileType,
      retrievedFileTypeRight as FileType
    )
      .transformFileToBlob()
      .then(({ url, data }) => {
        setDataUrl(url);
        setDataArchive(data)
        setHowAlreadyLoad();
      })
      .catch((error) => {
        setHowAlreadyLoad();
        console.error("Error converting file:", error);
        return alert("Failed to convert file");
      });

    onHandleValidFile(data);
  };

  return (
    <div className="upload-container">
      <input type="file" onChange={onHandleChange} ref={fileInput} />
    </div>
  );
};
