import { utilsAtCoder } from "@/utils"
import { IUser } from '../../interface';
import { FC } from "react";

interface Props {
    user?: IUser;
}

export const AtCoderHeader:FC<Props> = ({ user }) => {
    if(!user) return null;
    
    return (
        <div className='w-full'>
            <div className='w-full p-2 rounded-md text-sm pb-7' 
                style={{ backgroundColor: utilsAtCoder.ratingColor(user.rating) }}
            >
                <span className='font-light text-xs'>ATCODER</span>
                <div className="w-full text-center py-7">
                    <span className="text-3xl font-semibold">{ user.handle }</span>
                    <div className='w-full text-center'>
                        <span>Rating: </span>
                        <span>{ user.rating }</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
