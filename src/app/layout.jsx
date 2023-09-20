import './globals.css'
import { roboto } from '../styles/fonts'
import Sidebar from '../components/Sidebar'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={roboto.className} suppressHydrationWarning={true}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-0 md:ml-48"> {/* Remove ml-48 on mobile */}
            <Navbar />
            <div className="mt-16 h-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}


