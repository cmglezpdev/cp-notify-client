import { IHandle } from "@/types/handle";
import { CodeforcesHeader } from "./CodeforcesHeader";
import { AtCoderHeader } from "./AtCoderHeader";

interface Props {
    handle?: IHandle;
    platform: string;
}

export function HandleHeader({ platform, handle }: Props) {
    if (platform.toUpperCase() === 'CODEFORCES') {
        return <CodeforcesHeader handle={handle} />
    }

    if (platform.toUpperCase() === 'ATCODER') {
        return <AtCoderHeader handle={handle} />
    }

    return null;
}