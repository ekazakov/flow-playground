// @flow

type A = {|
    +value: string,
    +children?: {
        +[key: string]: MyType
    }
|}

type B = {|
    +counter: number,
    +children?: {
        +[key: string]: MyType
    }
|}

type MyType = A | B;

const data: MyType = {
    value: 'x',
    children: {
        foo: {
            value: 'b',
            children: {
                doo: {
                    counter: 1,
                    children: {
                        bar: {
                            counter: 2,
                            children: {}
                        }
                    }
                }
            }
        },
        baz: {
            counter: 3,
            children: {}
        }
    }
};
type Result = {
    value: string | number,
    children: Result[]
}

function foo(x: MyType): Result {
    if (typeof x.value === 'string') {
        const children = x.children;
        const result: Result = {
            value: x.value,
            children: []
        };
        if (children != null) {
            const keys = Object.getOwnPropertyNames(children);
            for (let key of keys) {
                result.children.push(foo(children[key]));
            }
            // keys.forEach((key: string) => {
            //     result.children.push(foo(children[key]));
            // })
        }
        return result;

    } else {
        const children = x.children;
        const result: Result = {
            value: x.counter,
            children: []
        };
        if (children != null) {
            const keys = Object.getOwnPropertyNames(children);
            for (let key of keys) {
                result.children.push(foo(children[key]));
            }
        }
        return result;
    }
}

console.log(JSON.stringify(foo(data), null, 2));