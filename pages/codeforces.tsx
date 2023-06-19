import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next'

import { ICodeforcesContest, IContest } from '@/interface'
import { Contest, CodeforcesHeader } from '@/components';
import { baseApi } from '@/api';

interface Props {
  contests: IContest[];
}

const Codeforces : NextPage<Props> = ({ contests }) => {
  return (
    <>
      <Head>
        <title>CP Notify</title>
        <meta name="description" content="Notify about Competitive Programming Contests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-[300px] bg-blue-200 p-2'>
        <CodeforcesHeader />
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

export default Codeforces;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const response : Response = await fetch('http://localhost:3000/api/codeforces', { method: 'GET' }); 
  const { data } = await baseApi.get<{ contests: ICodeforcesContest[] }>('/codeforces');
  const { contests } = data;
  contests.sort((contestA, contestB) => contestA.startTimeSeconds - contestB.startTimeSeconds);

  const codeforcesContest : IContest[] = contests.map(contest => ({
    id: contest.id,
    name: contest.name,
    type: contest.type,
    platform: 'CODEFORCES',
    durationSeconds: contest.durationSeconds,
    startTimeSeconds: contest.startTimeSeconds * 1000,
    link: `https://codeforces.com/contests/${contest.id}`,
  }))
  
  return {
    props: { contests: codeforcesContest }
  }
}