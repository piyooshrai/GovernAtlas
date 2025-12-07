import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'GovernAtlas - AI Tools for Regulated Industries';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e40af"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 16,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          GovernAtlas
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 48,
          }}
        >
          AI Tools for Regulated Industries
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            fontSize: 20,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>✓</span> Governance Scores
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>✓</span> Compliance Verified
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>✓</span> User Reviews
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
