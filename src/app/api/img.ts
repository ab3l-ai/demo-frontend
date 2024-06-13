import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // 예시로 외부 서버의 API URL
    const externalApiUrl = process.env.NEXT_PUBLIC_TXT2IMG_URL+ "/img/";

    try {
      const response = await axios.post(externalApiUrl, req.body);
      res.status(200).json({ data: response.data });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send data to external server' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}