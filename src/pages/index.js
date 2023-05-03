import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='text-center text-[70px]'>
      <h1 className='font-bold'>Navigate to product or Just<Link className='text-red-600' href={'/product'}> Click here</Link> </h1>
    </main>
  )
}
