import { extractValuesFromStyle } from '../src/utils/extractValuesFromStyle';

describe('Extracting values from CSS/SVG style', () => {
    it('extracts correct values', () => {
        expect(extractValuesFromStyle(`translate`, `translate(1px,2px,3px)`)?.map(({ value }) => value)).toEqual([
            1, 2, 3,
        ]);
        expect(extractValuesFromStyle(`translate`, `translate(1px 2px 3px)`)?.map(({ value }) => value)).toEqual([
            1, 2, 3,
        ]);
        expect(extractValuesFromStyle(`translate`, `translate(1.5px,2.1px,0.5px)`)?.map(({ value }) => value)).toEqual([
            1.5, 2.1, 0.5,
        ]);
        expect(
            extractValuesFromStyle(`translate`, `translate(-1.5px -2.1px -0.5px)`)?.map(({ value }) => value),
        ).toEqual([-1.5, -2.1, -0.5]);
    });

    it('can deal with extra spaces and formating', () => {
        expect(
            extractValuesFromStyle(
                `translate`,
                `translate(           -1.5px         -2.1px
                
                -0.5px)`,
            )?.map(({ value }) => value),
        ).toEqual([-1.5, -2.1, -0.5]);
    });

    it('can deal with incorrect input', () => {
        expect(extractValuesFromStyle(`translate`, `foo(-1.5px -2.1px -0.5px)`)).toEqual(null);

        // TODO: More
    });

    it('extracts correct units', () => {
        expect(extractValuesFromStyle(`translate`, `translate(-1.5px -2.1px -0.5px)`)?.map(({ unit }) => unit)).toEqual(
            ['px', 'px', 'px'],
        );
        expect(extractValuesFromStyle(`translate`, `translate(-1.5% -2.1% -0.5vh)`)?.map(({ unit }) => unit)).toEqual([
            '%',
            '%',
            'vh',
        ]);
        expect(extractValuesFromStyle(`rotate`, `rotate(25grad)`)?.map(({ unit }) => unit)).toEqual(['grad']);
    });

    it('extracts correct values and units', () => {
        expect(extractValuesFromStyle(`translate`, `translate(-1.5px -2.1px -0.5px)`)).toEqual([
            {
                value: -1.5,
                unit: 'px',
            },
            {
                value: -2.1,
                unit: 'px',
            },
            {
                value: -0.5,
                unit: 'px',
            },
        ]);
    });
});
