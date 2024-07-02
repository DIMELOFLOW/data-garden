// json format
const jsonDatas = [
  { name: "Juan", age: 25, city: "Madrid" },
  { name: "Ana", age: 30, city: "Barcelona" },
  { name: "Carlos", age: 35, city: "Valencia" }
];

// convert JSON a CSV
function getJsonToCsvs(jsonData: any[]) {
  const keys = Object.keys(jsonData[0]).join(","); // headers
  let csvContent = `${keys}\n`; // Line separator

  jsonData.forEach((row) => {
    const values = Object.values(row).map(value => `"${value}"`).join(",");
    csvContent += `${values}\n`;
  });
  
  return csvContent;
}

// Show result
const csvDatas = getJsonToCsvs(jsonData);
console.log(jsonData);
console.log(csvData);
