// @flow

import { type User }from './types';

const a: number = 2;    
let b: ?string = Math.random() > 0.4 ? 'luck' : null;

function div(a, b) {
    return a/b;
}

div(3, []);

if (b != null) {
    console.log(b);
}



// exact type
type LogEntry = {|
    name: string,
|}

function log(entry: LogEntry) {
    console.log(entry.name);
}

const x: User = { name: 'Mike', age: null };
const e: LogEntry = { name: 'Entry' };

// log(x);
log(e);

type Mapped = {
    name?: string,
    [key: string]: number | boolean,
}

const obj: Mapped = {};
obj.a = 1
obj.b = true;
obj.name = 'dfo';


type FooType = {
    [[call]]: (a: number) => number,
    dropCache: Function,
};

declare var foo: FooType;
foo(1);
foo.dropCache();

type Usr = {
    id?: string
}

declare var usr: Usr;

function enshureId(id: mixed): boolean %checks {
    return typeof id === 'string';
} 

if (enshureId(usr.id)) {
    console.log(usr.id.toUpperCase())
}