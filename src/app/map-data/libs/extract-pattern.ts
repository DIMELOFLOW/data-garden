type DataObject = { [key: string]: any };

function getNestedHeadersWithTypes(
  obj: DataObject,
  prefix: string = ""
): { [key: string]: string } {
  const headers: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === "object") {
        if (value.length > 0) {
          Object.assign(headers, getNestedHeadersWithTypes(value[0], fullKey));
        }
      } else {
        headers[fullKey] = "array";
      }
    } else if (typeof value === "object" && value !== null) {
      Object.assign(headers, getNestedHeadersWithTypes(value, fullKey));
    } else {
      headers[fullKey] = typeof value;
    }
  }

  return headers;
}

export function getHeadersWithTypesJson(
  dataArchive: string
): { [key: string]: string } | null {
  if (!dataArchive) {
    return null;
  }

  let dataArray: Array<DataObject> = [];

  try {
    dataArray = JSON.parse(dataArchive);
  } catch (error) {
    console.error("Error parsing JSON string:", error);
    return null;
  }

  const allHeaders: { [key: string]: string } = {};

  dataArray.forEach((dataObject) => {
    const headers = getNestedHeadersWithTypes(dataObject);
    Object.assign(allHeaders, headers);
  });

  return allHeaders;
}

function inferDataType(value: any): string | number | boolean {
  if (!isNaN(Number(value))) {
    return Number(value);
  } else if (
    value.toLowerCase() === "true" ||
    value.toLowerCase() === "false"
  ) {
    return Boolean(value);
  } else {
    return value;
  }
}

export function getHeadersWithTypesCsv(csvString: string): string {
  try {
    const rows: Array<any[]> = csvString
      .split("\n")
      .map((line) => line.split(",").map(inferDataType));

    if (rows.length === 0) return "";

    const headerRow = rows[0];

    const header: { [key: string]: string } = {};
    headerRow.forEach((value: string, index: number) => {
      header[`Column${index + 1}`] = typeof value;
    });

    const headerNames = headerRow.map((value) => value.toString()).join(",");

    const csv = headerRow
      .map(
        (value: string, index: number) =>
          `${headerNames.split(",")[index]}: ${typeof inferDataType(value)}`
      )
      .join(", ");

    return csv;
  } catch (err) {
    console.error("Error al extraer el encabezado:", err);
    return "";
  }
}
