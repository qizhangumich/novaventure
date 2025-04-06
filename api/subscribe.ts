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

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(),
    },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return json({ error: 'Invalid email' }, 400);
    }

    // Verify environment variables
    if (!process.env.NOTION_SECRET || !process.env.NOTION_DATABASE_ID) {
      console.error('Missing environment variables:', {
        NOTION_SECRET: !!process.env.NOTION_SECRET,
        NOTION_DATABASE_ID: !!process.env.NOTION_DATABASE_ID
      });
      return json({ error: 'Server configuration error' }, 500);
    }

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Email: {
          title: [{ text: { content: email } }],
        },
        SubscribeAt: {
          date: { start: new Date().toISOString() },
        },
      },
    });

    return json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
} 