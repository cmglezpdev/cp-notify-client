
export const ratingColor = (rank: number) : string => {
    if(rank < 1200) return "#ccc";
    if(rank < 1400) return "#7f7";
    if(rank < 1600) return "#7db";
    if(rank < 1900) return "#aaf";
    if(rank < 2100) return "#f8f";
    if(rank < 2300) return "#fc8";
    if(rank < 2400) return "#fb5";
    if(rank < 2600) return "#f77";
    if(rank < 3000) return "#f33";
                    return "#a00";
}