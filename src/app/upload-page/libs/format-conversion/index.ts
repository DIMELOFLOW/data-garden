export function getCSVFromJSON(jsonString: string): ArrayBuffer {

  const jsonData: Array<Record<string, string>> = JSON.parse(jsonString);
  const keys = Object.keys(jsonData[0]).join(",");
  let csvContent = `${keys}\r\n`;

  jsonData.forEach((row) => {
    const values = Object.values(row).join(",");
    csvContent += `${values}\r\n`;
  });
  
  const uint8array = new TextEncoder().encode(csvContent);
  const arrayBufferOutput = uint8array.buffer;

  return arrayBufferOutput;
}

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
