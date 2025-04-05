# NovaVenture

A modern landing page for NovaVenture, built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Smooth scrolling navigation
- Interactive investment theme cards
- Notion-powered email subscription system
- Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Notion account and integration

### Installation

1. Clone the repository:
```bash
git clone https://github.com/qizhangumich/novaventure.git
cd novaventure
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Notion credentials:
```
VITE_NOTION_SECRET=your_notion_integration_token
VITE_NOTION_DATABASE_ID=your_notion_database_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Environment Setup

1. Create a Notion integration at https://www.notion.so/my-integrations
2. Create a full-page database in Notion with `Email` and `SubscribeAt` columns
3. Share the database with your integration
4. Copy the integration token and database ID to your `.env` file

## Built With

- React
- TypeScript
- Tailwind CSS
- Vite
- Notion API

## License

This project is licensed under the MIT License. 