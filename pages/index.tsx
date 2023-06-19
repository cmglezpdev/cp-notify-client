import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <Head>
        <title>CP Notify</title>
        <meta name="description" content="Notify about Competitive Programming Contests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-[300px] bg-blue-200 p-2 min-h-screen'>
        <h1 className='font-bold text-3xl text-center'>Platform Contest</h1>
        <div className='flex flex-col gap-2 my-2'>
          <Link href='/codeforces' className='w-full p-3 border-2 border-black rounded-md text-center cursor-pointer'>
            CODEFORCES
          </Link>
          <Link href='/atcoder' className='w-full p-3 border-2 border-black rounded-md text-center cursor-pointer'>
            ATCODER
          </Link>
        </div>
      </main>  
    </>
  )
}

export default Home;
