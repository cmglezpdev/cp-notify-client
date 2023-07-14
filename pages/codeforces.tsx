import { GetServerSideProps, NextPage } from 'next'

import { IContest, IUser } from '@/interface'
import { Contest, CodeforcesHeader } from '@/components';
import { baseApi } from '@/api';
import { AppLayout } from '@/layout';

interface Props {
  contests: IContest[];
  user: IUser | null;
}

const Codeforces : NextPage<Props> = ({ contests, user }) => {
  return (
    <AppLayout>
        <CodeforcesHeader user={user} />
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
  contests?: IContest[];
  user?: IUser[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const contestsResponse = await baseApi.get<ApiResponse>('/codeforces');
  const userResponse = await baseApi.get<ApiResponse>('/profile?platform=CODEFORCES&handle=CodeExtreme');

  let contests: IContest[] = []
    if(contestsResponse.data.ok) { 
      contests = contestsResponse.data.contests!;
    } else {
      console.log("[CODEFORCES ERROR]: " + contestsResponse.data.message);
    }

    const user = userResponse.data.user;
    
    if(!userResponse.data.ok) {
      console.log("[CODEFORCES ERROR]: " + userResponse.data.message);
    }

    return {
      props: { contests, user }
    }
}