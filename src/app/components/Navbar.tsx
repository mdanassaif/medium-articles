'use client'


// Navbar.js
import { Inter } from 'next/font/google';
import { useEffect, useState, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Navbar() {
  const [text, setText] = useState('');
  const fullText = "Saif's Latest 10 Medium Articles";
  const particlesRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  
 

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 bg-[#000000] shadow-lg ${inter.className}`}>
      <canvas ref={particlesRef} className="absolute top-0 left-0 w-full h-full"></canvas>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center overflow-hidden relative">
          <svg className="absolute left-0 top-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#8bcfc8" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <text x="50%" y="50%" textAnchor="middle" className="text-2xl lg:text-4xl font-bold" fill="url(#gradient)">
              {text}
            </text>
          </svg>
          <div className="text-4xl font-bold text-transparent h-16">{fullText}</div>
        </div>
      </div>
  
    </nav>
  );
}