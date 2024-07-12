"use client";

import { ChangeEvent, FC, useRef, useState } from "react";
import { Constants } from "@helpers";
import { getCsvToJson, getJsonToCsv, downloadFile } from "../../libs/format-conversion";

const { FILE_SELECTED_FORMATS } = Constants;

type IProps = {
  onHandleValidFile: (data: any) => void;
};

export const UploadFiles: FC<IProps> = ({ onHandleValidFile }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

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
      "text/csv": "CSV",
    };

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

    try {
      if (file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = () => {
          const handleCsvLoad = async () => {
            const csvData = reader.result as string;
            data = getCsvToJson(csvData);
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            setDataUrl(url);
          };
          handleCsvLoad();
        };
        reader.readAsText(file);
      } else if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = () => {
          const handleJsonLoad = async () => {
            const jsonData = reader.result as string;
            const jsonObject = JSON.parse(jsonData);
            data = getJsonToCsv(jsonObject);     
            const blob = new Blob([data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            setDataUrl(url);
          };
          handleJsonLoad();
        };
        reader.readAsText(file);
      }
    } catch (error) {
      console.error("Error converting file:", error);
      return alert("Failed to convert file");
    }

    onHandleValidFile(data);
  };

  return (
    <div className="upload-container">
      <input type="file" onChange={onHandleChange} ref={fileInput} />
      {dataUrl && (
        <button onClick={() => downloadFile(dataUrl)}
        >Descargar Archivo                     
        </button>
      )}
    </div>
  );
};
