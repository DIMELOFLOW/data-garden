import { json2csv, csv2json } from 'json-2-csv';
import { Constants } from "@helpers";

export async function getCSVFromJSON(jsonData: string) {

  const object = JSON.parse(jsonData)
  const csv = await json2csv(object, {unwindArrays: true })
  
  return csv
};

export async function getJSONFromCSV(csvString: string) {

  const json = await csv2json(csvString)
  const jsonString = JSON.stringify(json, null, Constants.INDENTATION_LEVEL);

  return jsonString
};

export function downloadFile(dataUrl: string | null, fileType: string | null) {
  if (!dataUrl || !fileType) {
    return; 
  }
  const link = document.createElement("a");
  link.href = dataUrl;
  link.setAttribute("download", `converted.${fileType?.toLowerCase()}` );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}