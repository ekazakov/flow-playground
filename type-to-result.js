// @flow

const func = () => {}

declare function func2(flag: false): {| hello: typeof func |};
declare function func2(flag: true): {| bonjour: typeof func |};

function func2(flag: boolean) {
    if (flag) {
        return {
            hello: func
        }
    }

    return {
        bonjour: func
    }
}

const a = func2(false);
const b = func2(true);

a.hello();
b.bonjour();


declare function foo1(x: string): string;
declare function foo1(x: number): number;
declare function foo1(x: mixed): null;

function foo1(x) {
    if (typeof x === 'string') {
        return 'hello';
    }

    if (typeof x === 'number') {
        return 1;
    }

    return null;
}

const a1: string = foo1('str');
const a2: number = foo1(1);
const a3: null = foo1(true);