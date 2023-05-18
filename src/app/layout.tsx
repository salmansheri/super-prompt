import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Super Prompts',
  description: 'Discover and Share AI Prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <body>
      <AuthProvider>

      <div className="main">
        <div className="gradient" />

      </div>
      <main className="app">
        <Navbar />
        {children}
      </main>
      </AuthProvider>
     </body>
    </html>
  )
}
