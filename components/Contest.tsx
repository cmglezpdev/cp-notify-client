import { FC } from "react";
import Link from "next/link";
import { formatDate, formatDuration } from "@/utils";
import { IContest } from "@/types/contest";

interface Props {
  contest: IContest;
}

export const Contest: FC<Props> = ({ contest }) => {
  const { id, name, link, durationSeconds, startTimeSeconds, type } = contest;

  return (
    <Link href={`/contests/${id}`} target='_blank' rel='noreferrer'>
      <div className='w-full bg-slate-700 text-slate-50 dark:bg-slate-800/70 dark: dark:text-slate-300 rounded-md my-1 border dark:border-slate-500 cursor-default text-sm hover:scale-103 transition-transform'>
        <h3 className='text-center text-base font-semibold p-2 border-b border-slate-300 dark:border-b-slate-500'>{name}</h3>
        <div className='flex flex-col py-2'>
          <table>
            <thead>
              <tr className='text-center font-semibold'>
                <td>Type</td>
                <td>Length</td>
                <td>Start</td>
              </tr>
            </thead>
            <tbody>
              <tr className='text-center'>
                <td>{type}</td>
                <td>{formatDuration(parseInt(durationSeconds))}</td>
                <td>{formatDate(parseInt(startTimeSeconds))}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Link>
  )
}
