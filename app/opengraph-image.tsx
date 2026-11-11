import { ImageResponse } from 'next/og'

export const alt = 'EvolvNex — websites, branding, CRM and automation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0C0C0C',
          color: '#fff',
          padding: 80,
          borderTop: '8px solid #DC2626',
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, display: 'flex' }}>
          EVOLV<span style={{ color: '#DC2626' }}>NEX</span>
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 940 }}>
          Digital systems that help businesses move forward.
        </div>
        <div style={{ fontSize: 28, color: '#9CA3AF' }}>
          Websites · Branding · CRM & business systems · Automation
        </div>
      </div>
    ),
    size,
  )
}
