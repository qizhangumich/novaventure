import { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Validate email format
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  try {
    // Verify environment variables
    if (!process.env.NOTION_SECRET || !process.env.NOTION_DATABASE_ID) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Add to Notion database
    await notion.pages.create({
      parent: { database_id: DATABASE_ID! },
      properties: {
        Email: {
          title: [{ text: { content: email } }]
        },
        Status: {
          select: { name: 'Active' }
        },
        'Subscription Date': {
          date: { start: new Date().toISOString() }
        }
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return res.status(500).json({ error: 'Failed to add subscriber' });
  }
} 