// ✅ subscribe.ts
// Serverless API 用于处理订阅邮箱并写入 Notion

import { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';

// ✅ 使用 NOTION_SECRET 和 NOTION_DATABASE_ID（从 process.env）
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

// ✅ 邮箱格式验证函数
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ✅ 主函数（符合 Vercel Serverless 规范）
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 处理 CORS OPTIONS 请求
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // 检查是否已经存在该邮箱
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

    // 写入 Notion
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Email: {
          title: [{ text: { content: email } }],
        },
        SubscribeAt: {
          date: { start: new Date().toISOString() },
        },
      },
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Subscription error:', err);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
