import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className='flex justify-center items-center gap-4'>
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
        </div>
        <h2 className="text-3xl font-semibold text-gray-600 mb-6">Страница не найдена</h2>
        <p className="text-xl text-gray-500 mb-8">Уупс! Страница, которую вы ищете, не существует.</p>
        <Link 
          href="/" 
          className="px-6 py-3"
        >
            <Button>На главную</Button>
        </Link>
      </div>
    </div>
  )
}

