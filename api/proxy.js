export default async function handler(req, res) {
    const blobUrl = "https://bakkny68bbpifx3q.public.blob.vercel-storage.com/updated_crime_data_2015_2024-N3Np07WgA1t6B8O3X59TahV4aH2Jvd.csv";
  
    try {
      const response = await fetch(blobUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
      }
  
      const data = await response.text();
  
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "text/csv");
      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }