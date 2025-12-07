# GovernAtlas

A modern marketplace for AI tools designed for regulated industries. Browse 150+ verified AI tools with governance scores, compliance certifications, and real user reviews.

## Features

- **Browse & Search**: Full-text search across tools, vendors, and certifications
- **Advanced Filtering**: Filter by industry, use case, compliance certifications, pricing, and more
- **Tool Comparison**: Compare up to 4 tools side-by-side
- **Detailed Tool Pages**: Comprehensive information including features, integrations, reviews, and certifications
- **Industry Pages**: Explore tools by industry with compliance-focused insights
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Authentication**: Supabase Auth (Email/Password, Google OAuth)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/piyooshrai/GovernAtlas.git
cd GovernAtlas
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the schema from `supabase/schema.sql`
   - Copy your project URL and anon key from Settings > API

4. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. (Optional) Enable Google OAuth:
   - In Supabase Dashboard, go to Authentication > Providers
   - Enable Google and add your OAuth credentials

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   ├── signin/        # Sign in page
│   │   ├── signup/        # Sign up page
│   │   └── callback/      # OAuth callback handler
│   ├── browse/            # Browse/search page
│   ├── compare/           # Tool comparison page
│   ├── industries/        # Industries overview
│   ├── resources/         # Resources page
│   ├── tool/[slug]/       # Dynamic tool detail pages
│   ├── vendors/           # Vendor submission form
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── CompareBar.tsx     # Floating compare bar
│   ├── FilterSidebar.tsx  # Browse page filters
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Site header with auth
│   ├── SearchBar.tsx      # Search with autocomplete
│   └── ToolCard.tsx       # Tool listing card
├── context/               # React Context providers
│   ├── AuthContext.tsx    # Authentication state
│   └── CompareContext.tsx # Compare functionality state
├── data/                  # Static data (fallback)
│   ├── reviews.ts         # User reviews data
│   └── tools.ts           # Tool listings (25 tools)
├── lib/
│   └── supabase/          # Supabase client configuration
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       ├── middleware.ts  # Session refresh
│       └── types.ts       # Database types
└── types/                 # TypeScript types
    └── index.ts           # Type definitions

supabase/
└── schema.sql             # Database schema & migrations
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with default settings

### Static Export

For static hosting (Netlify, GitHub Pages, etc.):

1. Uncomment `output: 'export'` in `next.config.js`
2. Run `npm run build`
3. Deploy the `out` directory

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Data

The application includes 25 realistic AI tools across 8 industries:

- Healthcare
- Financial Services
- Legal
- Government
- Insurance
- Pharmaceutical
- Energy
- Education

Each tool includes:
- Governance score (out of 100, displayed as 5-star rating)
- Compliance certifications (SOC 2, HIPAA, FedRAMP, etc.)
- Features and integrations
- Deployment options
- Pricing tier
- User reviews

## Database Schema

The Supabase database includes the following tables:

| Table | Description |
|-------|-------------|
| `profiles` | User profiles (extends Supabase auth) |
| `vendors` | Vendor/company information |
| `tools` | AI tool listings |
| `industries` | Industry categories |
| `use_cases` | Use case categories |
| `certifications` | Compliance certifications |
| `reviews` | User reviews for tools |
| `vendor_submissions` | Pending vendor applications |
| `tool_industries` | Tool-industry relationships |
| `tool_use_cases` | Tool-use case relationships |
| `tool_certifications` | Tool-certification relationships |

All tables have Row Level Security (RLS) policies configured for proper access control.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Lucide](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework
