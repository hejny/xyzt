export type IVector = IVectorData; // TODO: | number[];

export interface IVectorData {
    x?: number;
    y?: number;
    z?: number;
    [axis: string]: number | undefined;
}

export type IAxis = 'x' | 'y' | 'z';
export const AXES = ['x', 'y', 'z'] as IAxis[];
