// @flow

declare type OIterateeWithResult<V, R> = Object | string | ((value: V) => R);
declare type OFlatMapIteratee<T, U> = OIterateeWithResult<any, Array<U>>;

declare type FlatMapIteratee<T, U> =
    | ((item: T) => Array<U>)
    | Object
    | {|[key: string]: mixed|}
    | string;

declare var flatMap: <T, U>(
    array?: ?$ReadOnlyArray<T>,
    iteratee?: ?FlatMapIteratee<T, U>
) => Array<U>;

declare var flatMap: <T: Object, U>(
    object: T,
    iteratee?: OFlatMapIteratee<T, U>
) => Array<U>;



const data = [{x: 1}];

const newData = flatMap<{x: number}, number>(data, (value) => [value.x]);
//
