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

async function handler(request: Request): Promise<Response> {
  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const { email } = await request.json();

    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Verify environment variables
    if (!process.env.NOTION_SECRET || !process.env.NOTION_DATABASE_ID) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
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

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return new Response(JSON.stringify({ error: 'Failed to add subscriber' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

export default handler; 