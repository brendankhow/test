let cachedData = null;

export async function loadRawData() {
  if (!cachedData) {
    // Use the public URL of the CSV file hosted on Vercel Blob
    const blobUrl = "https://bakkny68bbpifx3q.public.blob.vercel-storage.com/updated_crime_data_2015_2024-N3Np07WgA1t6B8O3X59TahV4aH2Jvd.csv";
    cachedData = await d3.csv(blobUrl);
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