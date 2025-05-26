"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleButtonClick = async () => {
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await fetch('/api/counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'button_clicked',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage(data.message);
      } else {
        setMessage('❌ Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Failed to send request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Hello Preet</h1>
        
        <button 
          className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl ${isLoading ? 'loading' : ''}`}
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Click Me! 🚀'}
        </button>
        
        <button className="btn btn-outline btn-warning">Primary</button>
        
        {message && (
          <div className="alert alert-info max-w-md">
            <span>{message}</span>
          </div>
        )}
      </main>
    </div>
  );
}
