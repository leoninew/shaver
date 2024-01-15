// @ts-ignore
import { camelize } from 'inflected';
import { isObject, knownTypes, Types } from "@/libs/types";

const CSharpTypes: Record<string, string> = {
    [Types.Empty]: 'object',
    [Types.String]: 'string',
    [Types.Number]: 'int',
    [Types.Boolean]: 'bool',
};

const CSharpClrTypes: Record<string, string> = {
    [Types.Empty]: 'Object',
    [Types.String]: 'String',
    [Types.Number]: 'Int32',
    [Types.Boolean]: 'Boolean',
};

const getTargetType = (originalType: string, useClrType: boolean) => {
    return (useClrType ? CSharpClrTypes[originalType] : CSharpTypes[originalType]) ?? originalType;
}

const getListType = (originalType: string, useClrType: boolean): string => {
    let typeName = originalType;
    let depth = 0;
    while (typeName.endsWith('[]')) {
        typeName = typeName.substring(0, typeName.length - 2);
        depth += 1;
    }

    let targetType = getTargetType(typeName, useClrType);
    for (let i = 0; i < depth; i++) {
        targetType = `${targetType}[]`;
    }
    return targetType;
}

export default function (json: any, options?: Record<string, any>): string {
    const types = knownTypes(json);
    const keepBrief = options?.keepBrief;
    const useClrType = options?.useClrType;
    const useJsonProperty = options?.useJsonProperty;
    const useJsonPropertyName = options?.useJsonPropertyName;
    const useCamelCasePropertyNamesContractResolver = options?.useCamelCasePropertyNamesContractResolver;
    const useCamelCaseJsonNamingPolicy = options?.useCamelCaseJsonNamingPolicy;
    const usePetaPoco = options?.usePetaPoco;

    const headers = [];
    const classes = [];
    let jsonPropertyUsed = 0;
    let jsonPropertyNameUsed = 0;
    let petaPocoColumnNameUsed = 0;

    for (const { name, type } of types) {
        const isObjectType = isObject(type);
        if (!isObjectType) {
            continue;
        }
        classes.push(`public class ${name}`);
        classes.push(`{`);
        const typeMap = type as Record<string, string>;
        const typeMembers = Object.keys(typeMap);
        for (const member of typeMembers) {
            const originalType = typeMap[member];
            const targetType = originalType.endsWith('[]')
                ? getListType(originalType, useClrType)
                : getTargetType(originalType, useClrType);
            const memberName = camelize(member);
            const useOriginalName = (keepBrief && memberName === member) || (!useJsonProperty && !useJsonPropertyName)

            if (useOriginalName) {
                classes.push(`    public ${targetType} ${member} { get; set; }`);
                continue;
            }

            if (useJsonProperty) {
                if (keepBrief && useCamelCasePropertyNamesContractResolver) {
                    const lowerName = camelize(memberName, false);
                    if (lowerName !== member) {
                        classes.push(`    [JsonProperty("${member}")]`);
                        jsonPropertyUsed += 1;
                    }
                }
                else {
                    classes.push(`    [JsonProperty("${member}")]`);
                    jsonPropertyUsed += 1;
                }
            }

            if (useJsonPropertyName) {
                if (keepBrief && useCamelCaseJsonNamingPolicy) {
                    const lowerName = camelize(memberName, false);
                    if (lowerName !== member) {
                        classes.push(`    [JsonPropertyName("${member}")]`);
                        jsonPropertyNameUsed += 1;
                    }
                }
                else {
                    classes.push(`    [JsonPropertyName("${member}")]`);
                    jsonPropertyNameUsed += 1;
                }
            }

            if (usePetaPoco) {
                if (keepBrief) {
                    const lowerName = camelize(memberName, false);
                    if (lowerName !== member) {
                        classes.push(`    [Column("${member}")]`);
                        petaPocoColumnNameUsed += 1;
                    }
                }
                else {
                    classes.push(`    [Column("${member}")]`);
                    petaPocoColumnNameUsed += 1;
                }
            }

            classes.push(`    public ${targetType} ${memberName} { get; set; }`);
        }
        classes.push(`}\n`);
    }

    if (jsonPropertyUsed) {
        headers.push(`using Newtonsoft.Json;`);
    }
    if (jsonPropertyNameUsed) {
        headers.push(`using System.Text.Json.Serialization;`);
    }
    if (petaPocoColumnNameUsed) {
        headers.push(`using PetaPoco;`);
    }
    if (headers.length > 0) {
        headers.push('');
    }
    return headers.concat(classes).join('\n');
}