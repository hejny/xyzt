export function stripInfatesimal(value: number): number {
    if (!(value < 1 && value > -1) && /^-?\d+(\.0+\d)?$/.test(value.toString())) {
        return value > 0 ? Math.floor(value) : Math.ceil(value);
    } else {
        return value;
    }

    /*
    // TODO: Maybe more efficient not using conversion to strings but only withing number type but the code below makes typical JS number WTFs
    Note: I am not using *1e15 directly, because JS make weird results with it:
        1.000000000000084*1e15 = 1000000000000083.9
    * /
    const decimal = value - Math.floor(value);
    const satoshi = (decimal * 1e16) / 10;

    return decimal;
    return satoshi.toString().substr(1) as any;

    if (parseInt(satoshi.toString().substr(1), 10) === 0) {
        return Math.floor(value);
    } else {
        return value;
    }
    */
}
