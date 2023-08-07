import { GetServerSideProps } from 'next';

import { AppLayout } from '@/layout';
import { httpService } from '@/services';
import { IContest } from '@/types/contest';
import { Contest } from '@/components';

interface Props {
    contests: IContest[];
}

function HomePage({ contests }: Props) {
    return (
        <AppLayout>
            <h1 className='font-bold text-3xl text-center'>Contests</h1>
            <main className='flex flex-col gap-2 my-2'>
                {
                    contests.map(contest => (
                        <Contest key={contest.id} contest={contest} />
                    ))
                }
            </main>
        </AppLayout>
    );
}

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const contests = await httpService.get<IContest[]>('/api/contest');

    return {
        props: { contests }
    };
};
