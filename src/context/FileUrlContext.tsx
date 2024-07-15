import React, { createContext, useContext, useState } from "react";


interface FileUrlContextType {
    dataUrl: string | null;
    setDataUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FileUrlContext = createContext<FileUrlContextType>({
    dataUrl: "",
    setDataUrl:
    () => {},
});

export const FileUrlContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
const [dataUrl, setDataUrl] = useState<string | null>(null);

return (
    <FileUrlContext.Provider value={ {dataUrl, setDataUrl} }>
        {children}
    </FileUrlContext.Provider>
)
} 