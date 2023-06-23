import { GetServerSideProps, NextPage } from 'next'

import { IContest } from '@/interface'
import { Contest, AtCoderHeader } from '@/components';
import { AppLayout } from '@/layout';
import { baseApi } from '@/api';

interface Props {
  contests: IContest[];
}

const AtCoder : NextPage<Props> = ({ contests }) => {
  return (
    <AppLayout>
        <AtCoderHeader />
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

export default AtCoder;

interface ApiResponse {
  ok: boolean;
  message?: string;
  contests?: IContest[]
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await baseApi.get<ApiResponse>('/atcoder');

  let contests: IContest[] = [];
  if(data.ok) contests = data.contests!;
  else {
    console.log("[ATCODER ERROR]: " + data.message!);
  }

  return {
    props: { contests }
  }
}