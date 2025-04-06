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

// Helper function to create JSON response
function createJsonResponse(data: any, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

async function handler(request: Request): Promise<Response> {
  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return createJsonResponse(null, 200);
  }

  if (request.method !== 'POST') {
    return createJsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const { email } = await request.json();

    if (!email || !isValidEmail(email)) {
      return createJsonResponse({ error: 'Invalid email address' }, 400);
    }

    // Verify environment variables
    if (!process.env.NOTION_SECRET || !process.env.NOTION_DATABASE_ID) {
      return createJsonResponse({ error: 'Server configuration error' }, 500);
    }

    // Add to Notion database
    const response = await notion.pages.create({
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

    return createJsonResponse({ 
      success: true,
      message: 'Successfully subscribed'
    });
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return createJsonResponse({ 
      error: 'Failed to add subscriber',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
}

export default handler; 