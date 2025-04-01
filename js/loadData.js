// filepath: /Users/brendankhow/Documents/GitHub/test/js/loadData.js
let cachedData = null;

export async function loadRawData() {
  if (!cachedData) {
    // Use the direct download link from Google Drive
    cachedData = await d3.csv("https://drive.google.com/uc?export=download&id=1Q7yPGguzVwps9a9foUprtQZ7j_bqV8K6");
    
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