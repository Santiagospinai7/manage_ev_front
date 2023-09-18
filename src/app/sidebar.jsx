import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="text-2xl font-semibold mb-6">Mi Aplicación</div>
      <ul>
        <li className="mb-2">
          <Link href="/">
            <a className="block hover:text-blue-500">Home</a>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/vehicles">
            <a className="block hover:text-blue-500">Vehicles</a>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/user/login">
            <a className="block hover:text-blue-500">Login</a>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/user/signUp">
            <a className="block hover:text-blue-500">Sign up</a>
          </Link>
        </li>
        <li className="mb-2">
          <a className="block hover:text-blue-500">Sign out</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
