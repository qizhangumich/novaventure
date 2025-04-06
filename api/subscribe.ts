import { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.VITE_NOTION_SECRET,
});

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type')
      .status(200)
      .end();
  }

  if (req.method !== 'POST') {
    return res
      .status(405)
      .setHeader('Allow', 'POST')
      .json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res
        .status(400)
        .json({ error: 'Invalid email address' });
    }

    const databaseId = process.env.VITE_NOTION_DATABASE_ID!;
    
    // Check for duplicates
    const existing = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Email',
        title: {
          equals: email,
        },
      },
    });

    if (existing.results.length > 0) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    // Add subscriber
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Email: {
          title: [
            {
              text: { content: email },
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
  } catch (err) {
    console.error('Subscription error:', err);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
