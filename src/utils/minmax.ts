/**
 * Count minimum and maximum on large arrays without hitting RangeError: Maximum call stack size exceeded
 */
export function minmax(array: number[]): { min: number; max: number } {
    let min = array[0];
    let max = array[0];

    for (const n of array) {
        if (n > max) max = n;
        if (n < min) min = n;
    }

    return { min, max };
}

/**
 * TODO: !!! Use this util istead of Math.min and Math.max
 */
