'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Navbar = () => {
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
    <div className="flex justify-between items-center p-4 text-white bg-blue-500 h-16 fixed w-full top-0 left-0">
      <div className="text-2xl font-semibold">Manage Ev</div>
      <nav>
        <ul className="flex space-x-4">
          <li className="mb-2">
            <Link href="/user/login">
              Login
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/user/signUp">
              SignUp
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
