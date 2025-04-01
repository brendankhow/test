let cachedData = null;

export async function loadRawData() {
  if (!cachedData) {
    // Use a CORS proxy to fetch the file
    const corsProxy = "https://proxy.cors.sh/";

    const googleDriveUrl = "https://drive.google.com/uc?export=download&id=1Q7yPGguzVwps9a9foUprtQZ7j_bqV8K6";
    cachedData = await d3.csv(corsProxy + googleDriveUrl);
    
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