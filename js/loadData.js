let cachedData = null;

export async function loadRawData() {
  if (!cachedData) {
    // Use the proxy endpoint to fetch the CSV file
    const proxyUrl = "/api/proxy";
    cachedData = await d3.csv(proxyUrl);
    cachedData.forEach(d => {
      d.Year = +d.Year;
      d.District = +d.District;
    });
  }
  return cachedData;
}

export async function loadData() {
  return await loadRawData();
}