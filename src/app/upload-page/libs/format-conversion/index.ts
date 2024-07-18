export function getCSVFromJSON(jsonString: string): string {
  const jsonData: Array<Record<string, string>> = JSON.parse(jsonString);

  const keys = Object.keys(jsonData[0]).join(",");
  let csvContent = `${keys}\n`;

  jsonData.forEach((row) => {
    const values = Object.values(row).join(",");
    csvContent += `${values}\n`;
  });
  return csvContent;
}

export function getJSONFromCSV(
  csvString: string
): Array<Record<string, string>> {
  const records = csvString.split("\n");

  const headers = records[0].split(",");
  const bodyValues = records.slice(1);

  return bodyValues.map((record) => {
    const obj: Record<string, string> = {};
    const values = record.split(",");

    headers.forEach((header, index) => {
      let cleanValue = values[index].replace(/\r\n|\n|\r/g, "");
      obj[header] = cleanValue;
    });

    return obj;
  });
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
