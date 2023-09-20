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
          <div className="flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}


