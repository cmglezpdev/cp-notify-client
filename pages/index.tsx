import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { AppLayout } from '@/layout';
import { ApiPlatformResponse, Platform } from '@/types/platform';

interface Props {
  platforms: Platform[];
}

function HomePage({ platforms }: Props) {
  return (
    <AppLayout>
      <h1 className='font-bold text-3xl text-center'>Online Judges</h1>
      <div className='flex flex-col gap-2 my-2'>
        {
          platforms.map(platform => (
            <Link
              key={platform.id}
              href={`/${platform.name.toLowerCase()}`}
              className='w-full p-3 border-2 border-black rounded-md text-center cursor-pointer'
            >
              {platform.name}
            </Link>
          ))
        }
      </div>
    </AppLayout>
  )
}

export default HomePage;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch('http://localhost:4000/api/platform');
  const { platforms }: ApiPlatformResponse = await response.json();

  return {
    props: { platforms }
  }
}

