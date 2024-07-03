const csvData = `nombre,edad,ciudad
Juan,25,Madrid
Ana,30,Barcelona`;

function getCsvToJson(csvString: string): any[] {
    const records = csvString.split('\n');
    const headers = records[0].split(',');
    const data: any[] = records.slice(1).map(record => {
      const obj: {[key: string]: string} = {};
      const fields = record.split(',');
      headers.forEach((header, index) => {
        obj[header] = fields[index];
      });
      return obj;
    });
    return data;
  }

  const jsonData = getCsvToJson(csvData);
 