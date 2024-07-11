export function getJsonToCsv(jsonData: Record<string, any>): string {
    const keys = Object.keys(jsonData);
    const csvRows = keys.map((key) => `${key},${jsonData[key]}`);
    const csvData = csvRows.join("\n");
    return csvData;
}

export function getCsvToJson(csvString: string): any[] {
    const records = csvString.split('\n');
    const headers = records[0].split(',');
    const data: any[] = records.slice(1).map(record => {
      const obj: { [key: string]: string } = {};
      const fields = record.split(',');
      headers.forEach((header, index) => {
        let fieldValue = fields[index].replace(/\r\n|\n|\r/g, '');
        obj[header] = fieldValue;
      });
      return obj;
    });
    return data;
}

