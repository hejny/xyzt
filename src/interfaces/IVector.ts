export type IVector = IVectorObject; // TODO: | number[];

// TODO: !!! Probbably suffix with Data
export interface IVectorObject {
    x?: number;
    y?: number;
    z?: number;
    [axis: string]: string | number | undefined;
}

export type IAxis = 'x' | 'y' | 'z';
export const AXES = ['x', 'y', 'z'] as IAxis[];
