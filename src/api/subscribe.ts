import { Client } from '@notionhq/client';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Check environment variables
if (!process.env.NOTION_SECRET) {
  throw new Error('NOTION_SECRET environment variable is not set');
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID environment variable is not set');
}

const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('API Request:', {
      method: req.method,
      body: req.body,
      headers: req.headers,
    });

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

    console.log('Checking for existing subscription:', email);
    // 查询是否已经存在
    const response = await notion.databases.query({
      database_id: databaseId,
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

    console.log('Creating new subscription for:', email);
    // 创建新订阅
    const result = await notion.pages.create({
      parent: { database_id: databaseId },
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

    console.log('Subscription created successfully:', result.id);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Subscription error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      body: error.body
    });
    
    // Check for specific Notion API errors
    if (error.code === 'unauthorized') {
      return res.status(500).json({ error: 'Invalid Notion API key' });
    }
    if (error.code === 'object_not_found') {
      return res.status(500).json({ error: 'Notion database not found' });
    }
    
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
