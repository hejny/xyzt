import { IVectorData } from './IVectorData';

export interface IPointData extends IVectorData {
    csid: string;
    // Note: Not "inCorsys(coorsys: ICoorsys): IPoint;" here because this interface should cointain only data not methods.
}
