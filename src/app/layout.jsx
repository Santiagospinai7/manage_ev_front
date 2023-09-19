import './globals.css'
import { roboto } from '../styles/fonts'
import Sidebar from '../components/Sidebar'

export const metadata = {
  title: 'Manage Ev',
  description: 'Manage Ev is a simple app to manage your electric vehicles.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={roboto.className} suppressHydrationWarning={true}>
        <Sidebar />
        {children}
      </body>
    </html>
  )
}

