// @flow
const util = require('util');

type SchemaKey = {
    // +type: 'key',
    +key: string,
    +schema: {
        +[path: string]: Schema
    }
}

type SchemaSingle = {
    // +type: 'single',
    +isSingleSchema: boolean,
    +schema: SchemaKey
}

type Schema = SchemaKey | SchemaSingle ;

const schema: Schema = {
    key: "teams",
    // type: 'key',
    schema: {
        whitelist: {
            // type: 'key',
            key: "whitelists",
            schema: {
                "en": {
                    // type: 'single',
                    isSingleSchema: true,
                    schema: {
                        // type: 'key',
                        key: "words",
                        schema: {}
                    }
                },
                "ru": {
                    // type: 'single',
                    isSingleSchema: true,
                    schema: {
                        // type: 'key',
                        key: "words",
                        schema: {}
                    }
                }
            }
        },
    }
};

// if (schema.key && typeof schema.key === 'string') {
//     const key = schema.key;
//     const whitelis = schema.schema.whitelis;
// }
// const a = schema.schema.whitelis.schema.en;
// if (typeof a.isSingleSchema === 'boolean' && a.schema && typeof a.schema === 'object') {
//     console.log(a.schema);
// }
// if (schema.schema != null && schema.schema.whitelis != null && schema.schema.whitelis.schema != null && schema.schema.whitelis.schema.en) {
//
// }

type Descriptor = {
    entityName: string,
    path: string,
    children: Descriptor[]
};

export function buildDescriptor(rootSchema: Schema): Descriptor {
    // declare function build(s: SchemaKey, path: string): Descriptor
    //
    // declare function build(s: SchemaSingle, path: string): Descriptor

    function build(sch: Schema, path: string): Descriptor {
        if (typeof sch.key === 'string') {
            const descriptor: Descriptor = {
                entityName: sch.key,
                path,
                children: []
            };

            // const schema = ((sch: any): SchemaKey).schema;
            const schema = sch.schema;
            const keys = Object.getOwnPropertyNames(schema);

            for (let subPath of keys) {
                const subDescriptor = build(schema[subPath], subPath);
                if (subDescriptor) {
                    descriptor.children.push(subDescriptor);
                }
            }

            return descriptor;
        } else {
            // const schema = ((sch: any): SchemaSingle).schema;
            const schema = sch.schema;

            return build(schema, path);
        }
    }

    return build(rootSchema, '');
}

const descr = buildDescriptor(schema);
console.log(util.inspect(descr, { depth: 10 }));