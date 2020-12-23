import { ICoorsys } from '../interfaces/ICoorsys';

export class CoorsysLibrary<TCoorsys extends ICoorsys> {
    public static fromCoorsyses<TCoorsys extends ICoorsys>(...coorsyses: TCoorsys[]): CoorsysLibrary<TCoorsys> {
        const coorsysLibrary = new CoorsysLibrary<TCoorsys>();
        for (const coorsys of coorsyses) {
            coorsysLibrary.pushCoorsys(coorsys);
        }
        return coorsysLibrary;
    }

    readonly coorsyses: Record<string, TCoorsys>;

    pushCoorsys(coorsys: TCoorsys) {
        this.coorsyses[coorsys.coorsysName] = coorsys;
    }

    // TODO: remove coorsys

    getCoorsys(coorsysName: string): TCoorsys {
        if (!this.coorsyses[coorsysName]) {
            throw new Error(`Coorsys "${coorsysName}" do not exists.`);
        }
        return this.coorsyses[coorsysName];
    }

    // TODO: virtual coorsyses by some logic
}
