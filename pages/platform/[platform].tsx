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
      {handle && <HandleHeader platform={platform} handle={handle} />}
      {
        contests.length !== 0
          ? (
            <div className='w-full pt-2'>
              {
                contests.map(contest => (
                  <Contest contest={contest} key={contest.id} />
                ))
              }
            </div>
          ) : (
            <ContestsNotFound />
          )

      }

    </AppLayout>
  )
}

// TODO: MEJORAR ESTE CARTEL CON UN svg
function ContestsNotFound() {
  return (
    <section className='w-full'>
      <h1 className='text-center mt-10 text-3xl'>Contests not found</h1>
    </section>
  )
}


export default Codeforces;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { platform } = (ctx.params as { platform: string });
  const token = ctx.req.cookies['__ACCESS_TOKEN__'] || '';
  const contests = await httpService.get<IContest[]>(`/api/contest/platform/${platform}`);

  let handle = null;
  try {
    handle = await httpService.get<IHandle>(`/api/user/profile/${platform}`, {
      headers: { authorization: `Bearer ${token}` }
    })
  } catch (error) {
    console.log(error);
  }

  return {
    props: { contests, handle, platform }
  }
}