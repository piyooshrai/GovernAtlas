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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── browse/            # Browse/search page
│   ├── compare/           # Tool comparison page
│   ├── industries/        # Industries overview
│   ├── resources/         # Resources page
│   ├── tool/[slug]/       # Dynamic tool detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── CompareBar.tsx     # Floating compare bar
│   ├── FilterSidebar.tsx  # Browse page filters
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Site header with nav
│   ├── SearchBar.tsx      # Search with autocomplete
│   └── ToolCard.tsx       # Tool listing card
├── context/               # React Context providers
│   └── CompareContext.tsx # Compare functionality state
├── data/                  # Static data
│   ├── reviews.ts         # User reviews data
│   └── tools.ts           # Tool listings (25 tools)
└── types/                 # TypeScript types
    └── index.ts           # Type definitions
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
