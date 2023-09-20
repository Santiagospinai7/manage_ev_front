import Image from 'next/image'

export default function Login() {
  return (
    <div className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
          <div className="flex flex-col md:flex-row">
              <div className="h-32 md:h-auto md:w-1/2">
                <picture>
                  <img 
                    className="object-cover w-full h-full" 
                    src="https://i.pinimg.com/564x/70/52/c9/7052c916e1a5638702614e284d5312c7.jpg"
                    alt="img" 
                  />
                </picture>
              </div>
              <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                  <div className="w-full">
                      <div className="flex justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none"
                              viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path
                                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                          </svg>
                      </div>
                      <h1 className="mb-4 text-2xl font-bold text-center text-gray-700"> 
                          Login to Your Account
                      </h1>
                      <div>
                          <label className="block text-sm">
                              Email
                          </label>
                          <input type="email"
                              className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                              placeholder="" />
                      </div>
                      <div>
                          <label className="block mt-4 text-sm">
                              Password
                          </label>
                          <input
                              className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                              placeholder="" type="password" />
                      </div>
                      <p className="mt-4">
                          <a className="text-sm text-blue-600 hover:underline" href="./forgot-password.html">
                              Forgot your password?
                          </a>
                      </p>


                      <button
                          className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                          href="#">
                          Log in
                      </button>


                      <hr className="my-8" />
                      <div className="flex items-center justify-center gap-4">
                          <button
                              className="flex items-center justify-center w-full px-4 py-2 text-s text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500">
                              <picture>
                                <img
                                  src="https://i.pinimg.com/564x/88/e1/4c/88e14cc7e7fcbb0e0e09de26cec86c61.jpg"
                                  alt="google"
                                  width={20}
                                  height={20}
                                />
                              </picture>
                              Gmail
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

