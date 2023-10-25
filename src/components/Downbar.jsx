'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

const BottomNavBar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full p-4 text-white bg-blue-500 flex justify-around items-center md:hidden rounded-t-3xl rounded-b-3xl">
      <Link href='/map'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="m15 21l-6-2.1l-4.65 1.8q-.5.2-.925-.113T3 19.75v-14q0-.325.188-.575T3.7 4.8L9 3l6 2.1l4.65-1.8q.5-.2.925.113T21 4.25v14q0 .325-.188.575t-.512.375L15 21Zm-1-2.45V6.85l-4-1.4v11.7l4 1.4Zm2 0l3-1V5.7l-3 1.15v11.7ZM5 18.3l3-1.15V5.45l-3 1V18.3ZM16 6.85v11.7v-11.7Zm-8-1.4v11.7v-11.7Z"/>
        </svg>
      </Link>
      
      <Link href='/vehicles'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m80 224l37.78-88.15C123.93 121.5 139.6 112 157.11 112h197.78c17.51 0 33.18 9.5 39.33 23.85L432 224m-352 0h352v144H80zm32 144v32H80v-32m352 0v32h-32v-32"/><circle cx="144" cy="288" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="368" cy="288" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg>
      </Link>

      <Link href='/chargePoints'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
            <path d="M6 9v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-5M9 5.6V7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6ZM4 5V3m4 2V3"/>
            <path stroke-linejoin="round" d="M18.167 4L16.5 7h4l-1.667 3"/>
          </g>
        </svg>
      </Link>

      <Link href='/statistics'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="m7 14l2.293-2.293a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 0 1.414 0L17 10m0 0v2.5m0-2.5h-2.5"/>
          </g>
        </svg>
      </Link>
    </div>

  );
};

export default BottomNavBar;


