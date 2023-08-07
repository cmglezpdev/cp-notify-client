import { FC } from 'react';
import { utilsCodeforces } from '@/utils';
import { IHandle } from '@/types/handle';

interface Props {
  handle?: IHandle;
}

export const CodeforcesHeader: FC<Props> = ({ handle }) => {
  if (!handle) return null;

  return (
    <div className='w-full'>
      <div className='w-full p-2 rounded-md text-sm'
        style={{ backgroundColor: utilsCodeforces.ratingColor(handle?.rating || 3000) }}
      >
        <span className='font-light text-xs'>CODEFORCES</span>
        <div className='w-full text-center py-7'>
          <span className='font-bold tracking-[.4rem]'>{handle?.rank.toUpperCase()}</span>
        </div>
        <div className='flex justify-between font-normal'>
          <span>{handle?.rating}</span>
          <span className="font-semibold">{handle?.handle}</span>
        </div>
      </div>
    </div>
  )
}
