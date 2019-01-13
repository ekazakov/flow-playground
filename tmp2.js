// @flow

type A = {|
    +value: string,
    +children?: {
        +[key: string]: MyType
    }
|}

type B = {|
    +counter: number,
    +children?: A
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
                            value: 'a',
                            children: {
                                bar: {

                                    counter: 2,
                                    children: {
                                        value: 'z',
                                        children: {}
                                    }
                                }
                            }
                        }
                    }
                }
            },
            baz: {

                counter: 3,
                children: {
                    value: 'b',
                    children: {}
                }
            }
        }
    }
;
type Result = {
    value: string | number,
    children: Result[]
}

function process(x: MyType): Result {
    if (typeof x.value === 'string') {
        const children = x.children;
        const result: Result = {
            value: x.value,
            children: []
        };
        if (children != null) {
            const keys = Object.getOwnPropertyNames(children);
            for (let key of keys) {
                result.children.push(process(children[key]));
            }
            // keys.forEach((key: string) => {
            //     result.children.push(process(children[key]));
            // })
        }
        return result;

    } else {
        if (x.children != null) {
            return process(x.children);
        }

        return {
            value: '',
            children: []
        }
    }
}

console.log(JSON.stringify(process(data), null, 2));