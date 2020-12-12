export function extractValuesFromStyle(
    functionName: string,
    cssTransform: string,
): Array<{ unit?: string; value: number }> | null {
    const matchInner = new RegExp(`${functionName}\\((?<inner>.*)\\)`, 'is').exec(cssTransform);

    if (!matchInner || !matchInner.groups || !matchInner.groups.inner) {
        return null;
    }

    const parts = matchInner.groups.inner.split(/\s*[\,\s]\s*/gs).filter((part) => part !== '');

    const values = parts.map((part) => {
        const matchPart = /^(?<value>\-?\d+(\.\d+)?)(?<unit>.*)$/.exec(part);

        if (!matchPart || !matchPart.groups) {
            return { value: 0 };
        }

        const { value, unit } = matchPart.groups;

        return { value: parseFloat(value), unit };
    });

    return values;
}
