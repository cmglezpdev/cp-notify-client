import { FC } from "react";
import Link from "next/link";
import { formatDate, formatDuration } from "@/utils";
import { IContest } from "@/types/contest";

interface Props {
  contest: IContest;
}

export const Contest: FC<Props> = ({ contest }) => {
  const { name, link, durationSeconds, startTimeSeconds, type } = contest;

  return (
    <Link href={link} target='_blank' rel='noreferrer'>
      <div className='w-full bg-gray-400 rounded-md my-1 border-2 border-gray-900 cursor-default text-sm'>
        <h1 className='text-center font-semibold py-2 border-b-2 border-b-gray-900'>{name}</h1>
        <div className='flex flex-col'>
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
