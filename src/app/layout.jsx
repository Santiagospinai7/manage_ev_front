import './globals.css'
import { roboto } from '../styles/fonts'
import { ReduxProvider } from '@/redux/provider'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={roboto.className} suppressHydrationWarning={true}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
