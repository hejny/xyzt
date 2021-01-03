export type IVectorData = IVectorDataObject; // TODO: | number[];

export interface IVectorDataObject {
    x?: number;
    y?: number;
    z?: number;
    [axis: string]: string | number | undefined;
}

export type IAxis = 'x' | 'y' | 'z';
export const AXES = ['x', 'y', 'z'] as IAxis[];
