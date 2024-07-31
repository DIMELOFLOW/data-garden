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
      headers[fullKey] = typeof fullKey;
    }
  }

  return headers;
}

function getNestedHeadersEqualToName(
  obj: DataObject,
  prefix: string = ""
): { [key: string]: string } {
  const headers: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      headers[fullKey] = fullKey;
    } else if (typeof value === "object" && value !== null) {
      Object.assign(headers, getNestedHeadersEqualToName(value, fullKey));
    } else {
      headers[fullKey] = fullKey;
    }
  }

  return headers;
}

export function getHeadersWithTypesJson(dataArchive: string): {
  headersWithType: { [key: string]: string };
  headersEqualToName: { [key: string]: string };
} | null {
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

  const headersWithType: { [key: string]: string } = {};
  const headersEqualToName: { [key: string]: string } = {};

  dataArray.forEach((dataObject) => {
    const headersWithTypeObj = getNestedHeadersWithTypes(dataObject);
    Object.assign(headersWithType, headersWithTypeObj);

    Object.assign(headersEqualToName, getNestedHeadersEqualToName(dataObject));
  });

  return { headersWithType, headersEqualToName };
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

export function getHeadersWithTypesCsv(
  csvString: string
): { csvWithTypes: string; csvEqualToName: string } | string {
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

    const csvWithTypes = headerRow
      .map(
        (value: string, index: number) =>
          `${headerNames.split(",")[index]}: ${typeof inferDataType(value)}`
      )
      .join(", ");

    const csvEqualToName = headerRow
      .map(
        (value: string, index: number) =>
          `${headerNames.split(",")[index]}: ${headerNames.split(",")[index]}`
      )
      .join(", ");
    return { csvWithTypes, csvEqualToName };
  } catch (err) {
    console.error("Error al extraer el encabezado:", err);
    return "";
  }
}
