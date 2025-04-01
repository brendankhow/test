import { put } from '@vercel/blob';

let cachedData = null;

export async function uploadAndFetchData(fileContent, filename) {
  // Upload the file to Vercel Blob
  const blob = await put(filename, fileContent, {
    access: 'public',
  });

  // Fetch the uploaded file from the public URL
  const blobUrl = blob.url; // Public URL of the uploaded file
  console.log(`File uploaded to: ${blobUrl}`);

  // Fetch and parse the CSV data
  cachedData = await d3.csv(blobUrl);
  cachedData.forEach(d => {
    d.Year = +d.Year;
    d.District = +d.District;
  });

  return cachedData;
}

export async function loadRawData() {
  if (!cachedData) {
    throw new Error('No data available. Please upload a file first.');
  }
  return cachedData;
}

export async function loadData() {
  return await loadRawData();
}