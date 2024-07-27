"use client";

import React, { FC, useState, useEffect } from "react";
import "./style/index.css";

import { BackButton, NextButton } from "@/components";
import { useDataArchiveContext } from "@/context/DataArchiveContext";
import { Constants, localStorage } from "@helpers";
import { useRouter } from "next/navigation";
import { getHeadersWithTypesCsv, getHeadersWithTypesJson } from './libs/extractPatterns'


const { FILE_SELECTED_FORMATS } = Constants;
const { clearLocalStorage } = localStorage;

const o = false

const pageMapData: FC = () => {
  const { dataArchive, setDataArchive } = useDataArchiveContext();
  const [selectedFormatRight, setSelectedFormatRight] = useState('');
  const router = useRouter();
  const [jsonAndCsvPatterns, setJsonAndCsvPatterns] = useState<string>('');
  
  const clearLocalStoreArchive = () => {
    setDataArchive(null);
    clearLocalStorage();
  }

  const convertArrayBufferToString = (buffer: ArrayBuffer): string => {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(buffer);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rightFormat = window.localStorage.getItem(FILE_SELECTED_FORMATS.SELECTEDFORMATRIGHT);
      setSelectedFormatRight(rightFormat || '');
    }

    if(!dataArchive) {
      router.push('/')
    }

    if (dataArchive) {
      const displayContent = dataArchive instanceof ArrayBuffer
        ? convertArrayBufferToString(dataArchive)
        : dataArchive || '';

        if (selectedFormatRight === 'JSON') {
          setJsonAndCsvPatterns(JSON.stringify(getHeadersWithTypesJson(displayContent), null, Constants.INDENTATION_LEVEL));
        } else {
          setJsonAndCsvPatterns(getHeadersWithTypesCsv(displayContent));
        }
    }

  }, [dataArchive, router, selectedFormatRight]);

  return (
    <div className="containerMapData">
      <div className="containerLeftRight">
        
        <div className="containerLeft">
          <div className="contentLeftRight">
            <h1 className="titlee">Your File {selectedFormatRight}</h1>
            <div className="archiveContainer">
              <pre>
                {jsonAndCsvPatterns}
              </pre>
            </div>
          </div>
          <BackButton path="/" onClick={clearLocalStoreArchive} />
        </div>

        <div className="containerRight">
          <div className="contentLeftRight">
            <h1 className="titlee">Remap Your Data</h1>
            <div className="archiveContainer">
              <textarea style={{ width: "100%", height: "100%" }} > </textarea>
            </div> 
          </div>
          <NextButton
          {...{
            path: "/ready-file",
            disabled: !o
          }}
        />
        </div>

      </div>
    </div>
  );
};

export default pageMapData;
