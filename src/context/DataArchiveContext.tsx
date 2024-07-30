"use client";

import React, { createContext, useContext, useState } from "react";

interface DataContextType {
  dataArchive: string | ArrayBuffer | null;
  setDataArchive: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >;
}

export const DataArchiveContext = createContext<DataContextType | undefined>(
  undefined
);

export const useDataArchiveContext = (): DataContextType => {
  const context = useContext(DataArchiveContext);
  if (context === undefined) {
    return {
      dataArchive: null,
      setDataArchive: () => {},
    };
  }
  return context;
};

export const DataArchiveContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [dataArchive, setDataArchive] = useState<string | ArrayBuffer | null>(
    null
  );

  return (
    <DataArchiveContext.Provider value={{ dataArchive, setDataArchive }}>
      {children}
    </DataArchiveContext.Provider>
  );
};
