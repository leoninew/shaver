import { isObject, knownTypes } from "@/libs/types";

export default function (json: any, options?: Record<string, any>): string {
    const types = knownTypes(json);
    const output = [];
    for (const { name, type } of types) {
        const isObjectType = isObject(type);
        if (!isObjectType) {
            continue;
        }

        output.push(`export interface ${name} {`);
        const typeMap = type as Record<string, string>;
        const typeMembers = Object.keys(typeMap);
        for (const member of typeMembers) {
            output.push(`  ${member}: ${typeMap[member]}`);
        }
        output.push(`}\n`);
    }
    return output.join('\n');
}