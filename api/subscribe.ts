import { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Validate email format
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Log request details
  console.log('API Request:', {
    method: request.method,
    headers: request.headers,
    body: request.body,
    env: {
      hasNotionKey: !!process.env.NOTION_API_KEY,
      hasDbId: !!process.env.NOTION_DATABASE_ID,
      dbId: process.env.NOTION_DATABASE_ID
    }
  });

  // Enable CORS
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify environment variables
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      console.error('Missing environment variables:', {
        hasNotionKey: !!process.env.NOTION_API_KEY,
        hasDbId: !!process.env.NOTION_DATABASE_ID
      });
      return response.status(500).json({ error: 'Server configuration error' });
    }

    const { email } = request.body;

    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({ error: 'Invalid email format' });
    }

    // Log the attempt
    console.log('Attempting to add email to Notion:', {
      email,
      databaseId: DATABASE_ID
    });

    // Check if email already exists
    const existingSubscribers = await notion.databases.query({
      database_id: DATABASE_ID!,
      filter: {
        property: 'Email',
        title: {
          equals: email,
        },
      },
    });

    if (existingSubscribers.results.length > 0) {
      console.log('Email already exists:', email);
      return response.status(400).json({ error: 'Email already subscribed' });
    }

    // Add to Notion database
    const result = await notion.pages.create({
      parent: { database_id: DATABASE_ID! },
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
        Status: {
          select: {
            name: 'Subscribed',
          },
        },
        'Subscription Date': {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    console.log('Successfully added to Notion:', {
      email,
      pageId: result.id
    });

    return response.status(200).json({
      success: true,
      message: 'Successfully subscribed!'
    });
  } catch (error) {
    console.error('Subscription error:', {
      error,
      stack: error.stack,
      code: error.code,
      message: error.message,
      status: error.status
    });

    return response.status(500).json({
      error: 'Failed to subscribe. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
} 