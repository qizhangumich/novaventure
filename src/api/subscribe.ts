import { Client } from '@notionhq/client';
import { VercelRequest, VercelResponse } from '@vercel/node';

const notion = new Client({ auth: process.env.NOTION_SECRET });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    // 查询是否已经存在
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: 'Email',
        title: {
          equals: email,
        },
      },
    });

    if (response.results.length > 0) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    // 创建新订阅
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        Email: {
          title: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        SubscribeAt: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Notion API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
