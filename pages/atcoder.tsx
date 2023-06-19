import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next'

import { IContest } from '@/interface'
import { Contest, AtCoderHeader } from '@/components';
import { scrapAtCoder } from '@/Scrappers';

interface Props {
  contests: IContest[];
}

const AtCoder : NextPage<Props> = ({ contests }) => {
  return (
    <>
      <Head>
        <title>CP Notify</title>
        <meta name="description" content="Notify about Competitive Programming Contests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-[300px] bg-blue-200 p-2'>
        <AtCoderHeader />
        <div className='w-full pt-2'>
          {
            contests.map(contest => (
              <Contest contest={contest} key={contest.id}/>
            ))
          }
        </div>
      </main>  
    </>
  )
}

export default AtCoder;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const contests = await scrapAtCoder();

  return {
    props: { contests }
  }
}