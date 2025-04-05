import { Client } from '@notionhq/client';

// Initialize the Notion client
const notion = new Client({
  auth: import.meta.env.VITE_NOTION_SECRET,
});

// Validate email format
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function handler(request: Request) {
  // Enable CORS
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

    // Check if email already exists
    const existingSubscribers = await notion.databases.query({
      database_id: import.meta.env.VITE_NOTION_DATABASE_ID!,
      filter: {
        property: 'Email',
        title: {
          equals: email,
        },
      },
    });

    if (existingSubscribers.results.length > 0) {
      return new Response(JSON.stringify({ error: 'Email already subscribed' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Add new subscriber
    await notion.pages.create({
      parent: {
        database_id: import.meta.env.VITE_NOTION_DATABASE_ID!,
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

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
} 