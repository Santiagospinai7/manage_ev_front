'use client'

export default function Login() {
  const handleLogin = () => {
    console.log("Login")
    // go to path /map
    window.location.href = "/map"
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-xl p-8 bg-white rounded-lg shadow-xl">
        <div className="flex justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-battery-automotive" width="72" height="72" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 6m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
          <path d="M6 6v-2"></path>
          <path d="M19 4l0 2"></path>
          <path d="M6.5 13l3 0"></path>
          <path d="M14.5 13l3 0"></path>
          <path d="M16 11.5l0 3"></path>
        </svg>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-700 mx-10">Login to Manage Ev</h1>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>
          <input type="email" className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="" />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm">Password</label>
          <input className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="" type="password" />
        </div>
        <p className="text-center">
          <a className="text-sm text-blue-600 hover:underline" href="./forgot-password.html">Forgot your password?</a>
        </p>
        <p className="mb-6 text-center">
          <a className="text-sm text-blue-600 hover:underline" href="/user/signUp">create new account</a>
        </p>
        <button onClick={handleLogin} className="w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">Log in</button>
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

