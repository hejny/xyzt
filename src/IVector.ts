export interface IVector {
    x?: number;
    y?: number;
    z?: number;
    [axis: string]: number | undefined;
}
