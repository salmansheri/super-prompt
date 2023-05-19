import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/providers/AuthProvider'; 
import getCurrentUser from '@/actions/getCurrentUser';
import ToasterProvider from '@/providers/ToasterProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Super Prompts',
  description: 'Discover and Share AI Prompts',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser(); 
 
  return (
    <html lang="en">
     <body>
      <AuthProvider>
        <ToasterProvider />

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
