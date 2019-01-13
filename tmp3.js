// @flow

type A = {|
    +type: 'A',
    +value: string,
    +children?: {
        +[key: string]: MyType
    }
|}

type B = {|
    +type: 'B',
    +counter: number,
    +children?: A
|}

type MyType = A | B;

const data: MyType = {
    type: 'A',
    value: 'x',
    children: {
        foo: {
            type: 'A',
            value: 'b',
            children: {
                doo: {
                    type: 'B',
                    counter: 1,
                    children: {
                        type: 'A',
                        value: 'a',
                        children: {
                            bar: {
                                type: 'B',
                                counter: 2,
                                children: {
                                    type: 'A',
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
            type: 'B',
            counter: 3,
            children: {
                type: 'A',
                value: 'b',
                children: {}
            }
        }
    }
};
type Result = {
    value: string | number,
    children: Result[]
}

function process(x: MyType): Result {
    if (x.type === 'A') {
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
        if(x.children != null) {
            return process(x.children);
        }

        return {
            value: '',
            children: []
        }
    }
}

console.log(JSON.stringify(process(data), null, 2));