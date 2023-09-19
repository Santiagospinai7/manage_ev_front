import './globals.css'
import { roboto } from '../styles/fonts'
import Sidebar from '../components/Sidebar'

export const metadata = {
  title: 'Manage Ev',
  description: 'Manage Ev is a simple app to manage your electric vehicles.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Sidebar />
        {children}
      </body>
    </html>
  )
}

