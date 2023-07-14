import { FC } from 'react';
import { utilsCodeforces } from '@/utils';
import { IUser } from '../../interface';
interface Props {
  user: IUser | null;
}

export const CodeforcesHeader:FC<Props> = ({ user }) => {
  if(!user) return null;

  return (
    <div className='w-full'>
        <div className='w-full p-2 rounded-md text-sm' 
          style={{ backgroundColor: utilsCodeforces.ratingColor(user?.rating || 3000) }}
        >
            <span className='font-light text-xs'>CODEFORCES</span>
            <div className='w-full text-center py-7'>
                <span className='font-bold tracking-[.4rem]'>{ user?.rank.toUpperCase() }</span>
            </div>
            <div className='flex justify-between font-normal'>
                <span>{ user?.rating }</span>
                <span className="font-semibold">{ user?.handle }</span>
            </div>
        </div>
    </div>
  )
}
