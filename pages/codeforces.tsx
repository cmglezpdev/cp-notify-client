import { GetServerSideProps, NextPage } from 'next'

import { ICodeforcesContest, IContest } from '@/interface'
import { Contest, CodeforcesHeader } from '@/components';
import { baseApi } from '@/api';
import { AppLayout } from '@/layout';

interface Props {
  contests: IContest[];
}

const Codeforces : NextPage<Props> = ({ contests }) => {
  return (
    <AppLayout>
        <CodeforcesHeader />
        <div className='w-full pt-2'>
          {
            contests.map(contest => (
              <Contest contest={contest} key={contest.id}/>
            ))
          }
        </div>
    </AppLayout>
  )
}

export default Codeforces;

interface ApiResponse {
  ok: boolean;
  message?: string;
  contests?: IContest[]
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await baseApi.get<ApiResponse>('/codeforces');

    let contests: IContest[] = []
    if(data.ok) { 
      contests = data.contests!;
    } else {
      console.log("[ATCODER ERROR]: " + data.message);
    }
  
    return {
      props: { contests }
    }
}