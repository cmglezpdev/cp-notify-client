

export const ratingColor = (rank: number) : string => {
    if(rank < 400)  return "#808080";
    if(rank < 800)  return "#804000";
    if(rank < 1200) return "#008000";
    if(rank < 1600) return "#00C0C0";
    if(rank < 2000) return "#0000FF";
    if(rank < 2400) return "#C0C000";
    if(rank < 2800) return "#FF8000";
                    return "#FF0000";
}