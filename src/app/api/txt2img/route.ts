import type {NextApiRequest, NextApiResponse} from 'next'
import axios from 'axios';

export async function POST(request: Request) {
    const jsonData = await request.json();

    console.log("SERVER Input: ", jsonData)

    const response = await axios.post(
        process.env.NEXT_PUBLIC_TXT2IMG_URL+ "/img/", 
        jsonData, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

    return new Response(JSON.stringify(response.data), {
        status: 200,
    });
}