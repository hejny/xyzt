export function modulo(dividend: number, divisor: number): number {
    // Note: The strange way how I use % is due to stupid JavaScript modulo bug.
    return ((dividend % divisor) + divisor) % divisor;
}
