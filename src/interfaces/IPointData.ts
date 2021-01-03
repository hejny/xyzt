import { IVector } from './IVector';

export interface IPointData extends IVector {
    coorsysName: string;
    // Note: Not "inCorsys(coorsys: ICoorsys): IPoint;" here because this interface should cointain only data not methods.
}
