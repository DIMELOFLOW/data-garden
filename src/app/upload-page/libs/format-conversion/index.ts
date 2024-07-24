import { Parser } from 'json2csv';

export function getCSVFromJSON(jsonString: string,): ArrayBuffer {
  
  const jsonData = JSON.parse(jsonString);

  const parser = new Parser({header: true});

  let csvData = parser.parse(jsonData);
  csvData = csvData.replace(/"/g, '');

  const encoder = new TextEncoder();
  const arrayBufferOutput = encoder.encode(csvData);
  return arrayBufferOutput
};

export function getJSONFromCSV(
  csvString: string
): ArrayBuffer {
  
  const records = csvString.split("\r\n");
  const headers = records[0].split(",");
  const bodyValues = records.slice(1);

  const jsonArray = bodyValues.filter(record => record !== "") 
  .map(record => {
    const cleanedValues = record.split(",").map(value => value.trim());
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = cleanedValues[index]; 
    });
    return obj;
  })
  .filter(obj => Object.values(obj).some(value => value !== "")); 

  const jsonStr = JSON.stringify(jsonArray, null, 2);
  const encoder = new TextEncoder();
  const arrayBuffer = encoder.encode(jsonStr);
  
  return arrayBuffer
}

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