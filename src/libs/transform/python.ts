import { isObject, knownTypes, Types } from "../types";

const PythonTypes: Record<string, string> = {
    [Types.String]: 'str',
    [Types.Number]: 'int',
    [Types.Boolean]: 'bool',
    [Types.Empty]: 'Any',
};

const getTargetType = (originalType: string) => {
    return PythonTypes[originalType] ?? originalType
}

const getListType = (originalType: string): string => {
    let typeName = originalType;
    let depth = 0;
    while (typeName.endsWith('[]')) {
        typeName = typeName.substring(0, typeName.length - 2);
        depth += 1;
    }

    let targetType = getTargetType(typeName);
    for (let i = 0; i < depth; i++) {
        targetType = `list[${targetType}]`;
    }
    return targetType;
}

export default function (json: any, options?: Record<string, any>): string {
    const types = knownTypes(json);
    const output = [];

    output.push(`from dataclasses import dataclass`);
    output.push('');

    for (const { name, type } of types) {
        const isObjectType = isObject(type);
        if (!isObjectType) {
            continue;
        }
        output.push('@dataclass');
        output.push(`class ${name}:`);
        const typeMap = type as Record<string, string>;
        const typeMembers = Object.keys(typeMap);
        for (const member of typeMembers) {
            const originalType = typeMap[member];
            const targetType = originalType.endsWith('[]')
                ? getListType(originalType)
                : getTargetType(originalType);
            output.push(`  ${member}: ${targetType}`);
        }
        output.push('');
    }
    return output.join('\n');
}
