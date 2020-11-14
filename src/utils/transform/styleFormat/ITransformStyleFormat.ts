export type IDimensionUnit = '(px)' | 'px';
export type IAngleUnit = '(rad)' | 'rad' | '(deg)' | 'deg' | 'grad' | 'turn';

export interface ITransformStyleFormat {
    dimensionUnit: IDimensionUnit;
    angleUnit: IAngleUnit;
    valuesDelimiter: ' ' | ',';
    fractionDigits: number;
}
