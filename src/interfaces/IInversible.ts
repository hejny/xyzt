export type IInversible<T> = T & {
    inverse(): IInversible<T>;
};
