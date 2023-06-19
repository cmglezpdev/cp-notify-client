import { utilsAtCoder } from "@/utils"

export const AtCoderHeader = () => {
    return (
        <div className='w-full'>
            <div className='w-full p-2 rounded-md text-sm pb-7' 
                style={{ backgroundColor: utilsAtCoder.ratingColor(1188) }}
            >
                <span className='font-light text-xs'>ATCODER</span>
                <div className="w-full text-center py-7">
                    <span className="text-3xl font-semibold">CodeExtreme</span>
                    <div className='w-full text-center'>
                        <span>Rating: </span>
                        <span>1188</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
