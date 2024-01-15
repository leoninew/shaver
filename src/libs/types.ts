// @ts-ignore
import { classify } from 'inflected';

const isArray = function (value: any) {
    return (!!value) && (value.constructor === Array);
};

export const isObject = function (value: any): boolean {
    return (!!value) && (value.constructor === Object);
}

export enum Types {
    Empty = "any",
    String = "string",
    Number = "number",
    Boolean = "boolean",
    Object = "object",
    Array = "array",
}

const infer = function (value: any): string {
    if (value === undefined || value === null) {
        return Types.Empty;
    }

    if (typeof value === 'string' || value instanceof String) {
        return Types.String;
    }

    if (typeof value === 'number' || value instanceof Number) {
        return Types.Number;
    }

    if (typeof value === 'boolean' || value instanceof Boolean) {
        return Types.Boolean;
    }

    if (value.constructor === Object) {
        return Types.Object;
    }

    if (Array.isArray(value)) {
        return Types.Array;
    }

    return Types.Empty;
}

type Type = string | Array<string> | Record<string, string>;

class Container {
    private readonly value: any;
    private readonly name: string;
    private readonly path: string;
    private readonly types: Map<string, Type>;

    constructor(value: any, name: string, path?: string, types?: Map<string, Type>) {
        this.value = value;
        this.name = name;
        this.path = path ?? "$";
        this.types = types ?? new Map<string, Type>();
    }

    parse(): string {
        if (isArray(this.value)) {
            const arrayType: Type = [];
            for (let i = 0; i < this.value.length; i++) {
                const item = this.value[i];
                const path = this.path ? `${this.path}[${i}]` : `$.[${i}]`;
                arrayType[i] = new Container(item, this.name, path, this.types).parse();
            }

            return this.findArrayType(arrayType);
        }

        if (isObject(this.value)) {
            const objectType: Type = {};
            for (const key of Object.keys(this.value)) {
                const item = this.value[key];
                const suffix = key.indexOf('.') !== -1 || key.indexOf(' ') !== -1
                    ? `['${key}']` : `${key}`;
                const path = this.path ? `${this.path}.${suffix}` : `$.${suffix}`;
                objectType[key] = new Container(item, key, path, this.types).parse();
            }

            return this.ensureObjectType(objectType);
        }

        return infer(this.value);
    }

    getKnownTypes(): { name: string, type: Type }[] {
        return Array.from(this.types.entries())
            .reverse()
            .map(e => ({ name: e[0], type: e[1] }));
    }

    private ensureObjectType(objectType: Record<string, string>): string {
        let typeName = this.findObjectType(objectType);
        if (typeName !== undefined) {
            return typeName;
        }

        typeName = this.uniqueTypeName(this.name);
        this.types.set(typeName, objectType);
        return typeName;
    }

    private hasObjectType(typename: string): boolean {
        return this.types.has(typename);
    }

    private findObjectType(targetType: Record<string, string>) {
        for (const [name, type] of this.types) {
            const isObjectType = isObject(type);
            if (!isObjectType) {
                continue;
            }

            const sourceType = type as Record<string, string>;
            const sourceKeys = Object.keys(sourceType);
            const targetKeys = Object.entries(targetType);

            if (sourceKeys.length === targetKeys.length) {
                if (sourceKeys.every((key) => sourceType[key] === targetType[key])) {
                    return name;
                }
            }
        }

        return undefined;
    }

    private uniqueTypeName(propertyName: string): string {
        const name = classify(propertyName)
        if (!this.types.has(name)) {
            return name;
        }
        for (let i = 1; ; i++) {
            const typeName = `${name}{i}`
            if (!this.types.has(typeName)) {
                return typeName;
            }
        }
    }

    private findArrayType(arrayType: Array<string>): string {
        const arrayTypeSet = new Set(arrayType);
        if (arrayTypeSet.size === 0) {
            return 'any[]';
        }

        console.assert(arrayTypeSet.size === 1);
        const typeName = arrayType[0];
        return typeName + "[]";
    }
}


export const knownTypes = function (json: any) {
    const container = new Container(json, "root");
    container.parse();
    return container.getKnownTypes();
}