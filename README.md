# 📸 Instagram Agent with A/B Testing

A full-stack web application that helps users generate Instagram content using AI and performs A/B testing to determine which content performs better.

## 🚀 Features

- **AI Content Generation**: Generate Instagram posts and stories using OpenAI's GPT-3.5
- **A/B Testing**: Each prompt generates two different content options for comparison
- **Content Selection**: Users can select their preferred option to improve AI performance
- **History Tracking**: View all previously generated content with selection history
- **Analytics Dashboard**: Real-time insights into which content style performs better
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Tech Stack

### Backend
- **NestJS** - Node.js framework for building scalable server-side applications
- **Prisma** - Modern database toolkit and ORM
- **PostgreSQL** - Relational database
- **OpenAI API** - AI content generation
- **TypeScript** - Type-safe JavaScript

### Frontend
- **React** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

## 📦 Project Structure

```
instagram-agent/
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── content/        # Content module (controller, service)
│   │   ├── dto/            # Data transfer objects
│   │   ├── openai/         # OpenAI service
│   │   ├── prisma/         # Prisma service
│   │   └── main.ts         # Application entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── .env                # Environment variables
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main application component
│   └── .env                # Environment variables
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` with your actual values:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/instagram_agent?schema=public"
OPENAI_API_KEY="your-openai-api-key-here"
PORT=3001
NODE_ENV=development
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Start the backend server:
```bash
npm run start:dev
```

The backend will be running on `http://localhost:3001`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` if needed (default should work):
```env
REACT_APP_API_URL=http://localhost:3001
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will be running on `http://localhost:3000`

### Running Both Projects
You'll need two terminal windows:
- Terminal 1: Run the backend from `./backend` directory
- Terminal 2: Run the frontend from `./frontend` directory

## 🔧 API Endpoints

- `POST /api/generate` - Generate AI content with two options
- `POST /api/select` - Select preferred option for A/B testing
- `GET /api/history` - Retrieve content generation history
- `GET /api/analytics` - Get A/B testing analytics

## 🏗️ Database Schema

```prisma
model Content {
  id             String       @id @default(cuid())
  prompt         String
  type           ContentType
  optionA        Json         // { caption: string; hashtags: string[] }
  optionB        Json         // { caption: string; hashtags: string[] }
  selectedOption SelectedOption?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}

enum ContentType {
  POST
  STORY
}

enum SelectedOption {
  A
  B
}
```

## 🚀 Deployment

### Backend Deployment (Railway/Render)
1. Create a new project on Railway or Render
2. Connect your GitHub repository
3. Set environment variables (DATABASE_URL, OPENAI_API_KEY)
4. Deploy the backend service

### Frontend Deployment (Vercel/Netlify)
1. Create a new project on Vercel or Netlify
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set environment variable: `REACT_APP_API_URL`
5. Deploy the frontend

## 🧪 Usage

1. **Generate Content**: Enter a prompt and select content type (Post or Story)
2. **Review Options**: Compare the two AI-generated content options
3. **Select Preference**: Click on your preferred option to contribute to A/B testing
4. **View Analytics**: Check the analytics to see which style performs better
5. **Browse History**: Review all previously generated content

## 🔒 Environment Variables

### Backend (.env)
Copy `.env.example` to `.env` and update with your values:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/instagram_agent
OPENAI_API_KEY=your-openai-api-key
PORT=3001
NODE_ENV=development
```

### Frontend (.env)
Copy `.env.example` to `.env` and update if needed:
```env
REACT_APP_API_URL=http://localhost:3001
```

**Important**: Never commit your actual `.env` files to version control. Use the `.env.example` files as templates.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- User authentication and profiles
- Content scheduling
- More AI providers (Claude, Gemini)
- Image generation integration
- Social media platform integration
- Advanced analytics and reporting
Homework Assignment: Building a simple Instagram Agent web app that help users generate and post content
