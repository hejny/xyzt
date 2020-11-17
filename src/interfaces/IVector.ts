export type IVector = IVectorObject; // TODO: | number[];

export interface IVectorObject {
    x?: number;
    y?: number;
    z?: number;
    [axis: string]: number | undefined;
}

export type IAxis = 'x' | 'y' | 'z';
export const AXIS = ['x', 'y', 'z'] as IAxis[];

/*
TODO:
export interface IVectorContext extends IVector {
    vector:
    context: string;
}
*/
