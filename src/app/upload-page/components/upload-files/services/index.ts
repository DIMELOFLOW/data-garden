import {
  getCSVFromJSON,
  getJSONFromCSV,
} from "@/app/upload-page/libs/format-conversion";

export enum FileType {
  JSON = "JSON",
  CSV = "CSV",
}

export const fileTypeMap = {
  json: "JSON",
  csv: "CSV",
  "application/json": "JSON",
  "text/csv": "CSV",
};

export const transformFile = (
  file: File,
  fromFile: FileType,
  toBlob: FileType
) => {
  type MapFunction = {
    [x in FileType]: {
      [y in FileType]: (
        args: any
      ) => ReturnType<typeof getCSVFromJSON | typeof getJSONFromCSV>;
    };
  };

  const mapFunction: MapFunction = {
    [FileType.CSV]: {
      [FileType.JSON]: getJSONFromCSV,
      [FileType.CSV]: (args: any) => args,
    },
    [FileType.JSON]: {
      [FileType.CSV]: getCSVFromJSON,
      [FileType.JSON]: (args: any) => args,
    },
  };

  const reader = new FileReader();

  const transformFileToBlob = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      reader.readAsText(file);

      reader.onload = async () => {
        try {
          const fileData = reader.result as string;
          let data: string | ArrayBuffer;
          if (mapFunction[fromFile][toBlob] instanceof Function) {
            data = await mapFunction[fromFile][toBlob](fileData);
          } else {
            data = fileData; 
          }
          const blob = new Blob([data], {
            type: fileTypeMap[toBlob as unknown as keyof typeof fileTypeMap],
          });
          const url = URL.createObjectURL(blob);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(reader.error);
      };
    });
  };

  return {
    transformFileToBlob,
  };
};
