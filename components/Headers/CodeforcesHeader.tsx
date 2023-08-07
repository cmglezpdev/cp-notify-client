import { FC } from 'react';
import { utilsCodeforces } from '@/utils';
import { IHandle } from '@/types/handle';



interface Props {
  handle?: IHandle;
}

export const CodeforcesHeader: FC<Props> = ({ handle }) => {
  if (!handle) return null;

  return (
    <div className='w-full text-slate-900 font-semibold text-lg'>
      <div className='w-full p-2 rounded-md text-sm'
        style={{ backgroundColor: utilsCodeforces.ratingColor(handle?.rating || 3000) }}
      >
        <span>CODEFORCES</span>
        <div className='w-full text-center py-7'>
          <span className='font-bold text-xl tracking-[.4rem]'>{handle?.rank.toUpperCase()}</span>
        </div>
        <div className='flex justify-between'>
          <span>{handle?.rating}</span>
          <span>{handle?.handle}</span>
        </div>
      </div>
    </div>
  )
}
