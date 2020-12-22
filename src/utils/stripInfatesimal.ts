import { NEGLIGIBLE_THRESHOLD, ε } from '../config';

//  TODO: Move to indipendent library
export function stripInfatesimal(value: number): number {
    if (value === NaN) {
        return NaN;
    }

    return stripInfatesimalOneSide(value, true);
}

function stripInfatesimalOneSide(value: number, cropSecondSide: boolean): number {
    if (value <= ε && value >= -ε) {
        return 0;
    }

    if (value < 0) {
        return -stripInfatesimalOneSide(-value, cropSecondSide);
    }

    if (value === Infinity) {
        return Infinity;
    }

    if (value < 1) {
        return stripInfatesimalOneSide(value * 10, cropSecondSide) / 10;
    }

    const decimal = value - Math.floor(value);

    if (decimal === 0) {
        return value;
    }

    const whole = value - decimal;

    if (decimal <= NEGLIGIBLE_THRESHOLD) {
        return whole;
    }

    if (cropSecondSide) {
        return whole + (1 - stripInfatesimalOneSide(1 - decimal, false));
    }

    return whole + decimal;
}
