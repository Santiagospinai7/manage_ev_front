import './globals.css'
import { roboto } from '../styles/fonts'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={roboto.className} suppressHydrationWarning={true}>
        <div>{children}</div>
      </body>
    </html>
  );
}


