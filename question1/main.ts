export function isValidWalk(walk: string[]): boolean {
    if (walk.length !== 10) return false; // 10 steps to be exactly 10 mins
    //since we are dealing with a perfect grid we will be moving vertical and horizantal(x,y)
    let vertical = 0;
    let horizontal = 0;

    walk.forEach(direction => {
        switch (direction) {
            case 'n': vertical++; break;
            case 's': vertical--; break;
            case 'e': horizontal++; break;
            case 'w': horizontal--; break;
        }
    });

    return vertical === 0 && horizontal === 0; // Assuming that (0,0) is the start point 
}