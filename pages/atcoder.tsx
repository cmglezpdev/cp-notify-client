import { GetServerSideProps, NextPage } from 'next'

import { IContest, IUser } from '@/interface'
import { Contest, AtCoderHeader } from '@/components';
import { AppLayout } from '@/layout';
import { baseApi } from '@/api';

interface Props {
  contests: IContest[];
  user?: IUser;
}

const AtCoder : NextPage<Props> = ({ contests, user }) => {
  return (
    <AppLayout>
        <AtCoderHeader user={user} />
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
  contests?: IContest[];
  user?: IUser;
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await baseApi.get<ApiResponse>('/atcoder');
  const userResponse = await baseApi.get<ApiResponse>('/profile?platform=ATCODER&handle=CodeExtreme');

  let contests: IContest[] = [];
  if(data.ok) contests = data.contests!;
  else {
    console.log("[ATCODER ERROR]: " + data.message!);
  }

  const user = userResponse.data.user;
  if(!userResponse.data.ok) {
    console.log("[ATCODER ERROR]: " + userResponse.data.message);
  }

  return {
    props: { contests, user }
  }
}