import { AppLayout } from '@/layout';
import Link from 'next/link'

const Home = () => {
  return (
      <AppLayout>
        <h1 className='font-bold text-3xl text-center'>Online Judges</h1>
        <div className='flex flex-col gap-2 my-2'>
          <Link href='/codeforces' className='w-full p-3 border-2 border-black rounded-md text-center cursor-pointer'>
            CODEFORCES
          </Link>
          <Link href='/atcoder' className='w-full p-3 border-2 border-black rounded-md text-center cursor-pointer'>
            ATCODER
          </Link>
        </div>
      </AppLayout>
  )
}

export default Home;
