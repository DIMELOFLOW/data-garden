"use client";

import React, { FC, useState, useEffect } from "react";
import "./style/index.css";

import { BackButton, NextButton } from "@/components";
import { useDataArchiveContext } from "@/context/DataArchiveContext";
import { Constants, localStorage } from "@helpers";
import { useRouter } from "next/navigation";
import {
  getHeadersWithTypesCsv,
  getHeadersWithTypesJson,
} from "./libs/extract-pattern";
import MonacoEditor, { OnChange } from "@monaco-editor/react";

const { FILE_SELECTED_FORMATS } = Constants;
const { clearLocalStorage } = localStorage;

const buttonDisable = false;

const PageMapData: FC = () => {
  const { dataArchive, setDataArchive } = useDataArchiveContext();
  const [selectedFormatRight, setSelectedFormatRight] = useState("");
  const router = useRouter();
  const [jsonAndCsvPatterns, setJsonAndCsvPatterns] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const clearLocalStoreArchive = () => {
    setDataArchive(null);
    clearLocalStorage();
    setValue("");
  };

  const convertArrayBufferToString = (buffer: ArrayBuffer): string => {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(buffer);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const rightFormat = window.localStorage.getItem(
        FILE_SELECTED_FORMATS.SELECTEDFORMATRIGHT
      );
      setSelectedFormatRight(rightFormat || "");
    }

    if (!dataArchive) {
      router.push("/");
      return;
    } else {
      const displayContent =
        dataArchive instanceof ArrayBuffer
          ? convertArrayBufferToString(dataArchive)
          : dataArchive || "";

      if (selectedFormatRight === "JSON") {
        const result = getHeadersWithTypesJson(displayContent);
        if (result === null) {
          console.error("No se pudo obtener los encabezados del JSON");
        } else {
          const { headersWithType, headersEqualToName } = result;
          setJsonAndCsvPatterns(
            JSON.stringify(headersWithType, null, Constants.INDENTATION_LEVEL)
          );
          const a = JSON.stringify(
            headersEqualToName,
            null,
            Constants.INDENTATION_LEVEL
          );
          setValue(a);
        }
      } else {
        const result = getHeadersWithTypesCsv(displayContent);
        if (typeof result === "string") {
          console.error("eerpr", result);
        } else {
          const { csvWithTypes, csvEqualToName } = result;
          setJsonAndCsvPatterns(csvWithTypes);
          setValue(csvEqualToName);
        }
      }
    }
  }, [dataArchive, router, selectedFormatRight]);

  const handleEditorChange: OnChange = (newValue, ev) => {
    if (typeof newValue === "string") {
      setValue(newValue);
    }
  };

  return (
    <div className="containerMapData">
      <div className="containerLeftRight">
        <div className="containerLeft">
          <div className="contentLeftRight">
            <h1 className="titlee">Your File {selectedFormatRight}</h1>
            <div className="archiveContainer">
              <pre>{jsonAndCsvPatterns}</pre>
            </div>
          </div>
          <BackButton path="/" onClick={clearLocalStoreArchive} />
        </div>

        <div className="containerRight">
          <div className="contentLeftRight">
            <h1 className="titlee">Remap Your Data</h1>
            <div className="archiveContainer">
              <MonacoEditor
                theme="vs-dark"
                language="javascript"
                value={value}
                onChange={handleEditorChange}
              />
            </div>
          </div>
          <NextButton
            {...{
              path: "/ready-file",
              disabled: !buttonDisable,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageMapData;
