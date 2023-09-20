export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-xl">
        <div className="flex justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">Login to Your Account</h1>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>
          <input type="email" className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="" />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm">Password</label>
          <input className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="" type="password" />
        </div>
        <p className="mb-6 text-center">
          <a className="text-sm text-blue-600 hover:underline" href="./forgot-password.html">Forgot your password?</a>
        </p>
        <button className="w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">Log in</button>
        <hr className="my-8" />
        <div className="flex items-center justify-center gap-4">
          <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500">
            <picture>
              <img src="https://i.pinimg.com/564x/88/e1/4c/88e14cc7e7fcbb0e0e09de26cec86c61.jpg" alt="google" width={20} height={20} />
            </picture>
            Gmail
          </button>
        </div>
      </div>
    </div>
  )
}

