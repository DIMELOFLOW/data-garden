"use client";

import { ChangeEvent, FC, useRef } from "react";
import { Constants } from "@helpers";
import { useFileUrlContext } from "@/context/FileUrlContext";
import { FileType, fileTypeMap, transformFile } from "./services";

const { FILE_SELECTED_FORMATS } = Constants;

type IProps = {
  onHandleValidFile: (data: any) => void;
  setHowLoading: () => void;
  setHowAlreadyLoad: () => void;
};

// TODO: FROM: El archivo que quiere el usuario fromFIle
export const UploadFiles: FC<IProps> = ({
  onHandleValidFile,
  setHowLoading,
  setHowAlreadyLoad,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const { , setDataUrl } = useFileUrlContext();

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
    const isRightFormatType =
      fileTypeMap[file.type as keyof typeof fileTypeMap] !== retrievedFileType;

    if (isRightFormatType) {
      if (fileInput.current) {
        fileInput.current.value = "";
      }
      return alert(`File should be type ${retrievedFileType}`);
    }

    let data: any;

    // TODO: No puede ser a lo malandro
    const fromFile = "CSV";
    setHowLoading();
    transformFile(
      file,
      fileTypeMap[file.type as keyof typeof fileTypeMap] as FileType,
      fromFile as FileType
    )
      .transformFileToBlob()
      .then((url) => {
        setDataUrl(url);
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
      {/* {dataUrl && (
        <button onClick={() => downloadFile(dataUrl)}
        >Descargar Archivo                     
        </button>
      )} */}
    </div>
  );
};
