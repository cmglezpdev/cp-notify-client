import { FC } from "react";
import Link from "next/link";
import { IContest } from "@/interface";
import { formatDate, formatDuration } from "@/utils";

interface Props {
    contest: IContest;
}

export const Contest:FC<Props> = ({ contest }) => {
    
    const { name, link, durationSeconds, startTimeSeconds, type } = contest;
    
    return (
    <Link href={link} target='_blank' rel='noreferrer'>
    <div className='w-96 bg-gray-400 rounded-md my-1 border-2 border-gray-900 cursor-default'>
      <h1 className='text-center font-semibold py-2 border-b-2 border-b-gray-900'>{ name }</h1>
      <div className='flex flex-col'>
        <table>
          <thead>
            <tr className='text-center font-semibold'>
              <td>Rules</td>
              <td>Length</td>
              <td>Start</td>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <td>{ type }</td>
              <td>{ formatDuration(durationSeconds) }</td>
              <td>{ formatDate(startTimeSeconds * 1000) }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Link>
  )
}
