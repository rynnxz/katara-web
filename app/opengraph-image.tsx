import { ImageResponse } from 'next/og';
import React from 'react';

export const alt =
  'KATARA - Aplikasi Belajar Bahasa & Budaya Melayu Nusantara (Deli, Langkat, Palembang)';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFF9EC',
          color: '#221910',
          padding: '56px 64px',
          border: '14px solid #186B4C',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              backgroundColor: '#E2F5EC',
              border: '3px solid #186B4C',
              borderRadius: '999px',
              padding: '10px 24px',
              color: '#0D3B29',
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            <span>KATARA • id.katara.app • Android Offline-First</span>
          </div>

          <div
            style={{
              display: 'flex',
              backgroundColor: '#FFF0BD',
              border: '3px solid #7A5700',
              borderRadius: '999px',
              padding: '10px 22px',
              color: '#221910',
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            <span>Terverifikasi SHA-256 &amp; Ed25519</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#221910',
            }}
          >
            Belajar Bahasa &amp; Budaya Melayu Nusantara
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.35,
              color: '#4A3E2D',
            }}
          >
            Melayu Deli • Melayu Langkat • Melayu Palembang • Aksara Jawi
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '3px solid #786954',
            paddingTop: '24px',
            fontSize: 24,
            fontWeight: 800,
            color: '#186B4C',
          }}
        >
          <span>980 Kosakata Terkurasi • 30 Dialog • 330 Kuis • 24 Rujukan Ilmiah</span>
          <span style={{ color: '#221910' }}>Gratis &amp; Tanpa Iklan</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
