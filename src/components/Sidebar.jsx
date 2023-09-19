import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="text-2xl font-semibold mb-6">Manage Ev</div>
      <ul>
        <li className="mb-2">
          <Link href="/">
            Home
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/vehicles">
            Vehicles
          </Link>
        </li>
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
  )
}

export default Sidebar;
