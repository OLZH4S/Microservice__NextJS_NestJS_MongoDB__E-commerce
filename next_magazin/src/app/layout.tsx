import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'magazIN',
    description: 'Microservice magazin nest next',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className='w-full h-full max-w-2xl mx-auto'>
                    {children}
                </div>
            </body>
        </html>
    )
}
