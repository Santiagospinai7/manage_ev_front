'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 640); // Adjust the threshold as needed
    };

    checkIsMobile(); // Check on initial load
    window.addEventListener('resize', checkIsMobile); // Check on window resize

    return () => {
      window.removeEventListener('resize', checkIsMobile); // Clean up event listener
    };
  }, []);

  return (
    <>
    {!isMobile && (
      <div className="fixed left-0 top-0 bottom-0 w-48 bg-blue-500 text-white p-4">
        <div className="text-2xl font-semibold mb-6">Manage Ev</div>
        <ul>
          <li className="mb-2">
            <Link href="/">Home</Link>
          </li>
          <li className="mb-2">
            <Link href="/vehicles">Vehicles</Link>
          </li>
          <li className="mb-2">
            <Link href="/user/login">Charging Stations</Link>
          </li>
        </ul>
      </div>
    )}
    </>
  )
}

export default Sidebar;
