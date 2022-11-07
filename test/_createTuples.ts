interface ICreateTuplesOptions<TItem> {
    items: TItem[];
    itemsPerTuple: number;
    onePermutation?: boolean;
}

export function createTuples<TItem>({ items, itemsPerTuple, onePermutation }: ICreateTuplesOptions<TItem>): TItem[][] {
    // TODO: Implement (probbably implemented and deleted in GIT history)
    return [];
}
