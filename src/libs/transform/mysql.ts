import {isObject, knownTypes, Types} from "../types";

const MySQLTypes: Record<string, string> = {
    [Types.String]: 'TEXT',
    [Types.Number]: 'INTEGER',
    [Types.Boolean]: 'TINYINT(1)',
};

const getTargetType = (originalType: string, useVarchar: boolean) => {
    return MySQLTypes[originalType] ?? '?';
}

export default function* (json: any, options?: Record<string, any>): Generator<string> {
    const types = knownTypes(json);
    const useNotNull = options?.useNotNull;
    const useVarchar = options?.useVarchar;

    const output = Array<string>();
    for (const { name, type } of types) {
        const isObjectType = isObject(type);
        if (!isObjectType) {
            continue;
        }

        const typeMap = type as Record<string, string>;
        const typeMembers = [];
        let maxMemberLength = 0;
        for (const member of Object.keys(typeMap)) {
            const targetType = getTargetType(typeMap[member], useVarchar);
            typeMembers.push({ memberName: member, memberType: targetType });
            if (member.length > maxMemberLength) {
                maxMemberLength = member.length;
            }
        }

        output.push(`DROP TABLE IF EXISTS \`${name}\`;`);
        output.push(`CREATE TABLE \`${name}\` (`);
        for (const { memberName, memberType } of typeMembers) {
            const prefixedType = ' '.repeat(maxMemberLength - memberName.length) + memberType;
            if (/^id$/i.test(memberName)) {
                output.push(`  \`${memberName}\` ${prefixedType} PRIMARY KEY`);
            } else {
                output.push(`  \`${memberName}\` ${prefixedType}`);
                if (useNotNull) {
                    output[output.length - 1] = output[output.length - 1] + ' NOT NULL';
                }
            }

            output[output.length - 1] = output[output.length - 1] + ',';
        }

        if (typeMembers.length > 0) {
            const length = output[output.length - 1].length;
            output[output.length - 1] = output[output.length - 1].substring(0, length - 1);
        }
        output.push(`);\n`);
    }

  for (const line of output) {
    yield line;
  }
}
