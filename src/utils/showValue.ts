export function showValue(fractionDigits: number, value: number): string {
    if (fractionDigits > 9) {
        throw new Error(`Max fractionDigits can be 9.`);
    }

    const e = 10 ** fractionDigits;
    return (Math.round(value * e) / e).toString();

    // Note: Not doing this way to prevent mess with RegEx> value.toFixed(fractionDigits).replace(/0+$/, '') +
}
