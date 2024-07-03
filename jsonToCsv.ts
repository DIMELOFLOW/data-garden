const jsonDatas = [
  { name: "Juan", age: 25, city: "Madrid" },
  { name: "Ana", age: 30, city: "Barcelona" },
  { name: "Carlos", age: 35, city: "Valencia" }
];

function getJsonToCsvs(jsonData: any[]) {
  const keys = Object.keys(jsonData[0]).join(",");
  let csvContent = `${keys}\n`;

  jsonData.forEach((row) => {
    const values = Object.values(row).map(value => `"${value}"`).join(",");
    csvContent += `${values}\n`;
  });
  
  return csvContent;
}

const csvDatas = getJsonToCsvs(jsonDatas);