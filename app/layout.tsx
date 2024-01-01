import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'
import { Theme, ThemePanel } from '@radix-ui/themes';
const inter = Inter({
  subsets: ['latin'],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export const viewport = {
  colorScheme: "dark"
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme appearence="dark" accentColor='purple'>
          <NavBar />
          <main className='p-5'>
            {children}
          </main>
          <ThemePanel />
        </Theme>
      </body>
    </html>
  )
}
