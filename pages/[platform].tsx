import { GetServerSideProps, NextPage } from 'next'

import { Contest } from '@/components';
import { AppLayout } from '@/layout';
import { httpService } from '@/services';

import { IHandle } from '@/types/handle';
import { IContest } from '@/types/contest';
import { HandleHeader } from '@/components/Headers';

interface Props {
  contests: IContest[];
  handle?: IHandle;
  platform: string;
}

const Codeforces: NextPage<Props> = ({ contests, handle, platform }) => {
  return (
    <AppLayout>
      <HandleHeader platform={platform} handle={handle} />
      <div className='w-full pt-2'>
        {
          contests.map(contest => (
            <Contest contest={contest} key={contest.id} />
          ))
        }
      </div>
    </AppLayout>
  )
}

export default Codeforces;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { platform } = (ctx.params as { platform: string });
  const token = ctx.req.cookies['__USER_TOKEN__'] || '';
  const contests = await httpService.get<IContest[]>(`/api/contest/${platform}`);
  const handle = await httpService.get<IHandle>(`/api/user/profile/${platform}`, {
    headers: { authorization: `Bearer ${token}` }
  });

  return {
    props: { contests, handle, platform }
  }
}