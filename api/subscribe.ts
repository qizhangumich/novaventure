import { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';

// Initialize the Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

// Validate email format
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('Received request:', {
    method: req.method,
    headers: req.headers,
    body: req.body
  });

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify environment variables
    if (!process.env.NOTION_SECRET || !process.env.NOTION_DATABASE_ID) {
      console.error('Missing required environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      console.warn('Invalid email attempt:', email);
      return res.status(400).json({ error: 'Invalid email address' });
    }

    console.log('Checking for existing subscriber:', email);
    // Check if email already exists
    const existingSubscribers = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Email',
        title: {
          equals: email,
        },
      },
    });

    if (existingSubscribers.results.length > 0) {
      console.log('Email already exists:', email);
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    console.log('Adding new subscriber:', email);
    // Add new subscriber
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
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

    console.log('Successfully subscribed:', email);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    // Check if it's a Notion API error
    if (error.code) {
      console.error('Notion API error:', {
        code: error.code,
        message: error.message,
        status: error.status
      });
    }
    return res.status(500).json({ error: 'Failed to subscribe. Please try again later.' });
  }
} 