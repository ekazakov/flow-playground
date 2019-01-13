// @flow

import {
    reduce,
    isArray,
    map,
    isPlainObject,
    snakeCase,
    camelCase,
    isFunction,
    property,
    defaultTo,
    get
} from 'lodash';



function objectToCase(fn: (string) => string ) {
    return <T: {} | Array<mixed>>(target: T): T => {
        if (isArray(target)) {
            return map(target, value => {
                if (value != null && typeof value === 'object' || Array.isArray(value)) {
                    return objectToCase(fn)(value);
                }

                return value;
            });
        }
        if (isPlainObject(target)) {
            return reduce(
                target,
                (acc: {}, value: mixed, key: string) => {
                    if (isPlainObject(value) || isArray(value)) {
                        acc[fn(key)] = objectToCase(fn)(value);
                    } else {
                        acc[fn(key)] = (value);
                    }
                    return acc;
                },
                {}
            );
        }

        return target;
    };
}




type Item = {
    [string]: Item | string | number | boolean | null | void | Array<Item>
} | number

const objectToCamelCase = (object) => {
    return objectToCase(camelCase)(object);
};

type Descriptor = {|
    params: {},
    url: string
|}

function sendRequest(options: Descriptor) {
}

const x = { x: 1 };

sendRequest({
    url: '/api/do',
    params: objectToCamelCase(x)
});

const bar = (p: string | number) => {
    if (typeof p === 'string') {
        return 'hello';
    }
    return 42;
};

let d = bar('dd');