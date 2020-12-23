import { IVector } from './IVector';

// TODO: !!! Probbably suffix with Data
export interface IVectorInCoorsys extends IVector {
    coorsysName: string;
    // Note: Not "inCorsys(coorsys: ICoorsys): IVectorInCoorsys;" here because this interface should cointain only data not methods.
}
